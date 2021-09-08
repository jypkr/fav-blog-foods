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
							<li class="list-group-item" ><form id = "comments">
                  <p>
                    <label for= "comment">Add Comment</label>
                    <input type = "text" name = "comment" id = "comment${food.name}">

                    </p>
                  <button  class="addComment" data-text="${food.name}">Add</button>
                  </form></li>
									<li class="list-group-item" id ="${food.name}Comment">Comments:</li>

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
							<li class="list-group-item" ><form id = "comments">
                  <p>
                    <label for= "comment">Add Comment</label>
                    <input type = "text" name = "comment" id = "comment${food.name}">

                    </p>
                  <button  class="addComment" data-text="${food.name}">Add</button>
                  </form></li>
									<li class="list-group-item" id ="${food.name}Comment">Comments:</li>
									
						</ul>
      `
			document.getElementById('foods').append(foodElem)
			food.comments.forEach( comment =>{
				let commentElem = document.createElement('p')
				commentElem.innerHTML= comment
				document.getElementById(`${food.name}Comment`).append(commentElem)
			})
			
		})
	})
	.catch(err => console.error(err))


document.addEventListener('click', event => {
	event.preventDefault()
	if(event.target.className === "addComment"){
		
		let name = event.target.dataset.text
		let comment = document.getElementById(`comment${name}`).value
		
	
		let foodItem = {
			name:name,
			comment: comment
		}

		axios.put(`/api/foods/${JSON.stringify(foodItem)}`)
		.then(()=>{
			let commentElem = document.createElement('p')
			commentElem.innerHTML = comment
			document.getElementById(`${name}Comment`).append(commentElem)
			document.getElementById(`comment${name}`).value=''
			
		})
	}


})