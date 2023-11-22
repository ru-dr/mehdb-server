const jwt = require('jsonwebtoken');
const register = require('../models/registerdata');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("Cookie ka token:", token)
        const verifyUser = jwt.verify(token, "3d02259de9d846fc4b9b9ea990ae8dccd797c8a3e147c051ae9f0a8cc4e783522ede2bcb798fb015e87049f1d64bf5a84c6cd87f91b4fdd4703cd42b29ff0e10");
        const rootUser = await register.findOne({ _id: verifyUser._id, "tokens.token": token});

        if (!rootUser) { throw new Error('User not found'); }

        req.token = token;
        req.rootUser = rootUser;

        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = authenticate;