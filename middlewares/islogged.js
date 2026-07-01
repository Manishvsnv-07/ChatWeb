import jwt from "jsonwebtoken"

function islogged(req, res, next) {
    let token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Not logged in" })
    }

    try {
        let verify = jwt.verify(token, process.env.MY_SECRET)
        req.datahere = verify
        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

export default islogged