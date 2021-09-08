const { axios } = window

document.getElementById('addItem').addEventListener('click', event => {
	event.preventDefault()

	const food = {
		name: document.getElementById('name').value,
		img: document.getElementById('img').value,
		calories: document.getElementById('calories').value,
		description: document.getElementById('description').value,
		comments: []
	}

	axios.post('/api/foods', food)
		.then(() => {
			const foodElem = document.createElement('div')
			foodElem
			foodElem.innerHTML = `
        <p>${food.name}</p>
				<img src="${food.img}" alt="food-img"></img>
				<p>${food.calories}</p>
				<p>${food.description}</p>
				<hr>
      `
			document.getElementById('foods').append(foodElem)

			document.getElementById('name').value = ''
			document.getElementById('img').value = ''
			document.getElementById('calories').value = ''
			document.getElementById('description').value = ''
		})
		.catch(err => console.error(err))
})

axios.get('/api/foods')
	.then(({ data: foods }) => {
		foods.forEach(food => {
			const foodElem = document.createElement('div')
			foodElem.innerHTML = `
        <p>${food.name}</p>
				<img src="${food.img}" alt="food-img"></img>
				<p>${food.calories}</p>
				<p>${food.description}</p>
				<hr>
      `
			document.getElementById('foods').append(foodElem)
		})
	})
	.catch(err => console.error(err))
