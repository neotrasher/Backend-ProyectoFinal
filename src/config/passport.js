import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github';
import bcrypt from 'bcrypt';
import userModel from '../models/user.models.js';

const setupPassport = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                if (!user || !(await bcrypt.compare(password, user.password))) {
                    return done(null, false, { message: 'Usuario o contraseña incorrectos' });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/users/github/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                let user = await userModel.findOne({ githubId: profile.id });

                if (!user) {
                    user = new userModel({
                        githubId: profile.id,
                        fullname: profile.username || 'Nombre por defecto',
                        email: profile.emails ? profile.emails[0].value : 'default@email.com',
                        age: 18,
                        password: Math.random().toString(36).substring(7),
                        username: profile.username,
                        role: 'usuario',
                    });

                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

export default setupPassport;
