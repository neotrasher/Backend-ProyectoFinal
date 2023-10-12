import userModel from '../models/user.models.js';
import bcrypt from 'bcrypt';

export const showLogin = (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        let errorMessage = req.query.error;
        res.render('login', { error: errorMessage});
    }
};

export const showRegister = (req, res) => {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('register');
    }
};

export const postRegister = async (req, res) => {
    const { email, password, first_name, last_name, age } = req.body; 

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.render('register', { error: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ email, password: hashedPassword, first_name, last_name, age });
    await user.save();

    res.redirect('/');
};

// export const postLogin = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email }).exec();
//     if (user && await bcrypt.compare(password, user.password)) {
//         req.session.user = user;
//         req.session.save(err => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//             res.cookie('userSession', user._id, { signed: true });
//             res.redirect('/');
//         });
//     } else {
//         res.render('login', { error: 'Usuario o contraseña incorrectos' });
//     }
// };


export const getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.redirect('/users/profile');
        }

        res.clearCookie(req.app.get('cookieName'));
        res.redirect('/');
    });
};
