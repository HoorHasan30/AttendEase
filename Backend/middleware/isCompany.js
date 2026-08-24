const isCompany = (req, res, next) => {
    
    if (!req.user) return res.status(401).json({ message: "Authentication required." });
    
    if ( req.user.role !== "Company") return res.status(403).json({ message: "Forbidden." });

    return next();
}

module.exports = isCompany;