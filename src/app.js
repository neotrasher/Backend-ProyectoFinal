import 'dotenv/config'
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import { engine } from 'express-handlebars';
import MongoDBStore from 'connect-mongodb-session';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderProducts } from './controllers/productController.js';
import passport from 'passport';
import setupPassport from './config/passport.js';
import setupSockets from './socket.js';
import routes from './routes/index.js'
import errorHandler from './middlewares/errors/errorHandler.js'
import Logger from './services/logger.js';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Documentacion eCommerce Backend",
            version: "1.0.0",
            description: "API eCommerce Backend",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(options);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    Logger.error('Error de conexión a MongoDB: ' + error);
});

db.once('open', () => {
    Logger.info('Conexión exitosa a MongoDB.');
});

app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

const MongoDBSessionStore = MongoDBStore(session);

const store = new MongoDBSessionStore({
    uri: process.env.MONGO_URL,
    collection: "session",
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: false,
        maxAge: 60000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

setupPassport();

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.get('/', renderProducts);
app.use(routes);
app.use(errorHandler);

app.get('/users/profile', (req, res) => {
    if (req.user) {
        res.render('profile', { user: req.user.toObject() });
    } else {
        res.redirect('/users/login');
    }
});

app.get('/api/current_user', (req, res) => {
    if (req.user) {
        return res.send(req.user);
    } else {
        return res.status(401).send({ error: 'Usuario no autenticado.' });
    }
});

app.get('/sessions/current', (req, res) => {
    if (req.user) {
        return res.render('current-user', { user: req.user });
    } else {
        return res.status(401).render('error', { error: 'Usuario no autenticado.' });
    }
});

const server = http.createServer(app);
const io = new Server(server, {
    path: '/socket.io'
});

setupSockets(io);

server.listen(port, () => {
    Logger.info(`Servidor escuchando en el puerto ${port}`);
});

export { io };
