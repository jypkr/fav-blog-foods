const router = require('express').Router()
const { foods } = require('../db')

router.get('/foods', (req, res) => {
	res.json(items)
})

router.post('/foods', (req, res) => {
	items.push(req.body)
	res.sendStatus(200)
})

router.put('/foods/:name', (req, res) => {
	const name = req.params.name
})
res.sendStatus(200)
})

router.delete('/foods/:name', (req, res) => {

	res.sendStatus(200)
})

module.exports = router
