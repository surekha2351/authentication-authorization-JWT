const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    try{
        let token = req.header('x-token'); //tokens headers lo untayi
        if(!token){
            return res.status(400).send("Token Not Found");
        }
        let decode = jwt.verify(token, "jwtsecured");
        req.user = decode.user
        next(); //req.user lo details emunte avi pass chestamu
    
          


    }catch(err){
        console.log(err)
        return res.status(500).send("Server Error")

        
    }
}