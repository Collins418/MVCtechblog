const router = require('express').Router();
const routesApi = require('./api');
const routesHomepage = require('./routesHomepage');
const routesDashboard = require('./routesDashboard');

router.use('/', routesHomepage);
router.use('/dashboard', routesDashboard);
router.use('/api', routesApi);


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;