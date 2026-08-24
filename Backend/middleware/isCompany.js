const isCompany = (req, res, next) => {
    if(!req.session.user.role == 'Company') return 
    next();
}

module.exports = isCompany;