const router = require('express').Router();
const noteRoutes = require('../apiRoutes/Routes.js');

router.use(noteRoutes);

module.exports = router;