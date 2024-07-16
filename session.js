const session = require('express-session');
const MySQLStore = require('connect-mysql-session')(session);
const mysql = require('mysql2');

const dbOptions = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'imback',
    database: process.env.DB_NAME || 'signup'
};

const connection = mysql.createConnection(dbOptions);

const sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, connection);

const sessionMiddleware = session({
    key: 'user_sid',
    secret: 'your_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
});

module.exports = sessionMiddleware;