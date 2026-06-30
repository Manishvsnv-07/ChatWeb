import jwt from "jsonwebtoken"


function islogged(req,res,next) {
    let token = req.cookies.token
    console.log(token);
    
    let verify = jwt.verify(token,"My_Secret")
    req.datahere = verify;
    console.log(verify);
    console.log(req.datahere);
    
    
    next()
}

export default islogged
