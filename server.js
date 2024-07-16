const express = require('express');
const cors = require('cors');
const session = require('./session'); // Adjust path as per your session configuration
const signupRoutes = require('./signup');
const signinRoutes = require('./signin');
const homeRoutes = require('./home');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(session); // Use your session middleware here

app.use(signupRoutes);
app.use(signinRoutes);
app.use(homeRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});