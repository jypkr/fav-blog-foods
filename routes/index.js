const router = require('express').Router()

router.use('/api', require('./foodsRouter.js'))

module.exports = router
