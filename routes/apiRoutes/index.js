// set up dependencies
const router = require('express').Router();
const routes = require('../apiRoutes/routes.js');

router.use(routes);

module.exports = router;