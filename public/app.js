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
			foodElem.classList = 'row'
			foodElem.innerHTML = `
				<div class="card" style="width: 18rem;">
					<div class="card-body justify-content-center">
						<h5 class="card-subtitle justify-content-center">${food.name} </h5>
						<h6 class="card-subtitle mb-2 text-muted"><i class="fas fa-glasses fa-2x"></i></h6>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">${food.calories} </li>
							<li class="list-group-item">${food.description} </li>
							<li class="list-group-item"><img src=${food.img}></img></li>
							<li class="list-group-item"><form id = "comments">
                  <p>
                    <label for= "comment">Add Comment</label>
                    <input type = "text" name = "comment" id = "comment">

                    </p>
                  <button  id="addComment" data-text="name">Add</button>
                  </form></li>
						</ul>
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
			foodElem.classList = 'row'
			foodElem.innerHTML = `
				<div class="card" style="width: 18rem;">
					<div class="card-body justify-content-center">
						<h5 class="card-subtitle justify-content-center">${food.name} </h5>
						<h6 class="card-subtitle mb-2 text-muted"><i class="fas fa-glasses fa-2x"></i></h6>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">${food.calories} </li>
							<li class="list-group-item">${food.description} </li>
							<li class="list-group-item"><img src=${food.img}></img></li>
							<li class="list-group-item"><form id = "comments">
                  <p>
                    <label for= "comment">Add Comment</label>
                    <input type = "text" name = "comment" id = "comment">

                    </p>
                  <button  id="addComment" data-text="name">Add</button>
                  </form></li>
						</ul>
      `
			document.getElementById('foods').append(foodElem)
		})
	})
	.catch(err => console.error(err))


document.getElementById('addComment').addEventListener('click', event => {
	event.preventDefault()
	let foodItem = event.target.dataset.text
	console.log(foodItem)

}