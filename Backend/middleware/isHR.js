const isHR = (req, res, next) => {

    if (!req.user) return res.status(401).json({ message: "Authentication required." });
    
    if ( req.user.role !== "HR") return res.status(403).json({ message: "Forbidden." });

    return next();
}

module.exports = isHR;