const withAuth = (req, res, next) => {
    // user will be redirect if not log in
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;