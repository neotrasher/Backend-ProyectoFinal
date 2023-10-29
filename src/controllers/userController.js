import userModel from '../models/user.models.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

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

export const postRegister = async (req, res, next) => {
    const { email, password, first_name, last_name, age } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.render('register', { error: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role = email === 'adminCoder@coder.com' ? 'admin' : 'usuario';

    const user = new userModel({ email, password: hashedPassword, first_name, last_name, age });
    await user.save();

    req.logIn(user, (err) => {
        if (err) {
            return next(err);
        }
        return res.redirect('/');
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

export const postRegisterAPI = async (req, res) => {
    const { email, password, first_name, last_name, age } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role = email === 'adminCoder@coder.com' ? 'admin' : 'usuario';

    const user = new userModel({ email, password: hashedPassword, first_name, last_name, age });
    await user.save();

    res.status(201).json({ message: 'Usuario creado correctamente' });
};

export const postLoginAPI = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json({ message: 'Inicio de sesión exitoso' });
        });
    })(req, res, next);
};

export const getLogoutAPI = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.clearCookie(req.app.get('cookieName'));
        res.status(200).json({ message: 'Sesión cerrada con éxito' });
    });
};