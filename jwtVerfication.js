var Token = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        req.token = token;
        Token.verify( token, "secretkey",(err, authData)=>{
            if (authData) {
                next();
            } else{
                res.sendStatus(403)

            }
        });
       
    } else {
        res.sendStatus(403)
    } 
}
module.exports = verifyToken;