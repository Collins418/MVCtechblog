//routes to user,blog and comment
const router = require('express').Router();
const routesUser = require('./routesUser');
const routesBlog = require('./routesBlog');
const routesComment = require('./routesComment');

router.use('/users', routesUser);
router.use('/blogs', routesBlog);
router.use('/comments', routesComment);

module.exports = router;