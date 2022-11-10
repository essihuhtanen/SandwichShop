const jwt = require('jsonwebtoken');
const jwtSecret = '57632151b6bba675732b9a01e73b0227f19cbf8b2a59994aa6960ca08752ef5fc3ffb7';

/**
 * Authenticates the user by checking json web token.
 * 
 * @param {Object} req HTTP request to authenticate
 * @returns 
 */
exports.auth = function(req) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    console.log(token);
    if (token === 'undefined') {
        console.log('test2');
        return false;
    } else {
        console.log('test1');
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return false
            } else {
                return true;
            }
        })
    }
};