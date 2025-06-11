function isAuthenticated(req, res, next) {
  if (!req.session?.user?.id) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }
  req.user = req.session.user;
  next();
}


module.exports = {
  isAuthenticated,
  
};