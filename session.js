const session = require('express-session');
const MySQLStore = require('connect-mysql-session')(session);
const db = require('./db'); 

const sessionStore = new MySQLStore({
    expiration: 86400000, 
    endConnectionOnClose: false, 
    createDatabaseTable: true, 
    schema: {
        tableName: 'sessions', 
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, db); 

module.exports = session({
    secret: 'your_secret_here', 
    store: sessionStore,
    resave: false, 
    saveUninitialized: true 
});
