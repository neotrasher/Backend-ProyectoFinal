import express from 'express';
import * as userController from '../controllers/userController.js';
import passport from 'passport';

const router = express.Router();

router.get('/login', userController.showLogin); 
router.get('/register', userController.showRegister); 

router.post('/register', userController.postRegister); 

router.get('/logout', userController.getLogout); 

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.redirect(`/users/login?error=${info.message}`); 
        }
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            return res.redirect('/');
        });
    })(req, res, next);
});


router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { 
    successRedirect: '/', 
    failureRedirect: '/users/login', 
}));

export default router;