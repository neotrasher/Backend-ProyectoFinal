import User from '../models/user.models.js';

export const register = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const user = new User({ email, password });
        const savedUser = await user.save();

        req.session.user = { id: savedUser._id, email: savedUser.email };  

        res.json(savedUser);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al registrar al usuario.' });
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        if (password !== user.password) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        req.session.user = { id: user._id, email: user.email }; 

        res.redirect('/');
    } catch (error) {
        return res.status(500).json({ error: 'Error al iniciar la sesión.' });
    }
};

export const logout = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar la sesión.' });
        }

        res.clearCookie('connect.sid').sendStatus(200); 
    });
};

export const protect = (req, res, next) => {
    if (req.session.user) {  
        next();  
    } else {
        res.redirect('/login'); 
    }
};

export const redirectIfLoggedIn = (req, res, next) => {
    if (req.session.user) {  
        res.redirect('/profile');  
    } else {
        next(); 
    }
};

export const getProfile = (req, res) => {
    res.render('partials/profile', { user: req.session.user });  
};

export const getLogin = (req, res) => {
    res.render('partials/login');  
};

export const getRegister = (req, res) => {
    res.render('partials/register'); 
};
