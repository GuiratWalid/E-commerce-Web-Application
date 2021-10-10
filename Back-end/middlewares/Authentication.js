const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

    //const token = req.body.token || req.query.token || req.headers["x-access-token"];
    let token = req.headers.authorization;
    if (!token) {
        res.status(403).send({ message: "A token is required for authentication" });
        console.log(`A token is required for authentication`);
    }
    token = token.substring(7);
    try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        res.status(401).send({ message: "Invalid Token" });
        console.log(`Invalid Token`);
    }
    next();

};

module.exports = verifyToken;