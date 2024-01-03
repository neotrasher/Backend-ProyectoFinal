import userModel from '../models/user.models.js';
import Cart from '../models/carts.models.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import CustomError from '../services/errors/CustomError.js';
import EErrors from '../services/errors/enums.js';
import { generateUserErrorInfo } from '../services/errors/info.js';
import Logger from '../services/logger.js';
import crypto from 'crypto';
import { recoveryEmail, deletionEmail } from '../config/nodemailer.js';
import dotenv from 'dotenv';

dotenv.config();

const recoveryURL = process.env.RECOVERY_URL;
const tokenExpirationTime = parseInt(process.env.TOKEN_EXP_TIME);

export const showLogin = (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        let errorMessage = req.query.error;
        res.render('login', { error: errorMessage });
    }
};

export const showRegister = (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('register');
    }
};

const validateUserData = (user) => {
    const camposRequeridos = ['email', 'password', 'first_name', 'last_name'];

    for (let campo of camposRequeridos) {
        if (!user[campo]) {
            throw CustomError.createError({
                name: EErrors.MISSING_REQUIRED_FIELDS.name,
                message: generateUserErrorInfo(user),
                code: EErrors.MISSING_REQUIRED_FIELDS.code,
            });
        }
    }
};

export const postRegister = async (req, res, next) => {
    const { email, password, first_name, last_name, age } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.render('register', { error: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role = email === process.env.ADMIN_EMAIL ? 'admin' : 'usuario';

    const user = new userModel({ email, password: hashedPassword, first_name, last_name, age });
    user.last_connection = Date.now();

    let cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
        cart = await Cart.create({ userId: user._id, products: [] });
    }

    user.cart = cart._id;
    req.session.cartId = cart._id;

    console.log('Stored cartId: ' + req.session.cartId);

    const savedUser = await user.save();

    req.logIn(user, (err) => {
        if (err) {
            return next(err);
        }
        return res.json({ user: savedUser, cartId: cart._id });
    });
};


export const getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.redirect('/users/profile');
        }

        res.clearCookie(req.app.get('cookieName'));
        res.redirect('/');
    });
};

export const postRegisterAPI = async (req, res, next) => {
    try {
        const { email, password, first_name, last_name, age } = req.body;

        validateUserData(req.body);

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let role = email === process.env.ADMIN_EMAIL ? 'admin' : 'usuario';

        const user = new userModel({ email, password: hashedPassword, first_name, last_name, age });
        user.last_connection = Date.now();
        
        const savedUser = await user.save();

        res.status(201).json({ message: 'Usuario creado correctamente', user: savedUser });
    } catch (error) {
        next(error);
    }
};

export const postLoginAPI = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }
        req.logIn(user, async function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            let cart = await Cart.findOne({ userId: user._id });
            if (!cart) {
                cart = await Cart.create({ userId: user._id, products: [] });
            }

            user.cart = cart;

            user.role = user.email === process.env.ADMIN_EMAIL ? 'admin' : 'usuario';
            user.last_connection = Date.now();
            await user.save();

            return res.status(200).json({ message: 'Inicio de sesión exitoso', user, cartId: cart._id });
        });
    })(req, res, next);
};

export const getCurrentSession = (req, res, next) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ error: 'No hay ninguna sesión activa' });
    }
};


export const getLogoutAPI = (req, res) => {
    req.session.destroy(async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (req.user) {
            req.user.last_connection = Date.now();
            await req.user.save();
        }
        res.clearCookie(req.app.get('cookieName'));
        res.status(200).json({ message: 'Sesión cerrada con éxito' });
    });
};

export const postPasswordRecovery = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            Logger.error('Intento de restablecimiento de contraseña para correo electrónico no registrado.');
            return res.status(404).json({ error: 'No existe usuario con ese correo electrónico' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + parseInt(tokenExpirationTime);
        await user.save();

        const link = `${recoveryURL}${token}`;

        recoveryEmail(user.email, link);

        res.status(200).json({ message: 'Correo de restablecimiento enviado' });
    } catch (error) {
        Logger.error('Error en postPasswordRecovery: ' + error.message);
        next(error);
    }
};

export const postResetPassword = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ passwordResetToken: req.params.token, passwordResetExpires: { $gt: Date.now() } });
        if (!user) {
            Logger.error('Intento de restablecimiento de contraseña con token inválido o expirado.');
            return res.status(400).json({ error: 'Token inválido o expirado. Solicita un nuevo correo de restablecimiento.' });
        }

        const newPassword = req.body.password;
        const oldPasswordMatch = await bcrypt.compare(newPassword, user.password);

        if (oldPasswordMatch) {
            return res.status(400).json({ error: 'No puedes usar la misma contraseña. Ingresa una contraseña diferente.' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Tu contraseña ha sido reestablecida' });
    } catch (error) {
        Logger.error('Error en postResetPassword: ' + error.message);
        next(error);
    }
};

export const updateCart = async (req, res) => {
    let cart = req.session.cart;

    cart = {
        ...cart,
        ...req.body,
    };

    req.session.cart = cart;

    res.json({ success: true, cart });
};

export async function uploadDocuments(req, res, next) {
    try {
        const userId = req.params.uid;
        const newDocuments = req.files.map(file => ({
            name: file.originalname,
            reference: file.path,
        }));

        const user = await userModel.findById(userId);
        user.documents.push(...newDocuments);
        await user.save();

        res.json({ message: 'Documento subido exitosamente' });
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({}, 'name email role');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const deleteInactiveUsers = async (req, res, next) => {
    try {
        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
        const users = await userModel.find({ last_connection: { $lt: twoDaysAgo } });
        users.forEach(async user => {
            deletionEmail(user.email);
            await userModel.deleteOne({ _id: user._id });
        });
        res.json({ message: 'Usuarios inactivos eliminados y notificados.' });
    } catch (error) {
        next(error);
    }
};