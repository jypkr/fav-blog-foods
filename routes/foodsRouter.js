const router = require('express').Router()
const { foods } = require('../db')

router.get('/foods', (req, res) => {
	res.json(foods)
})

router.post('/foods', (req, res) => {
	foods.push(req.body)
	res.sendStatus(200)
})

router.put('/foods/:foodItem',(req,res)=>{
	const foodItem = JSON.parse(req.params.foodItem)
	let name = foodItem.name
	let comment = foodItem.comment
	console.log(name,comment)
	foods.forEach(food=>{
		if(food.name === name){
			food.comments.push(comment)
			console.log(food.comments)
		}
	})

	res.sendStatus(200)
})

// router.put('/foods/:comments', (req, res) => {
// 	const comments = req.params.comments

// 	res.sendStatus(200)
// })

router.delete('/foods/:name', (req, res) => {
	const name = req.params.name
	foods = foods.filter(food => food.name !== name)
	res.sendStatus(200)
})

module.exports = router
