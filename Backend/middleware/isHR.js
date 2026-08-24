const isHR = (req, res, next) => {
    if(!req.session.user.role == 'HR') return 
    next();
}

module.exports = isHR;