const { axios } = window

document.getElementById('addItem').addEventListener('click', event => {
	event.preventDefault()

	const item = {
		text: document.getElementById('text').value,
		isDone: false
	}

	axios.post('/api/items', item)
		.then(() => {
			const itemElem = document.createElement('div')
			itemElem.innerHTML = `
        <p>${item.text}</p>
        <button class="isDone" data-text="${item.text}">${item.isDone ? 'Done' : 'Not Done'}</button>
        <button class="delete" data-text="${item.text}">X</button>
        <hr>
      `
			document.getElementById('items').append(itemElem)

			document.getElementById('text').value = ''
		})
		.catch(err => console.error(err))
})

axios.get('/api/items')
	.then(({ data: items }) => {
		items.forEach(item => {
			const itemElem = document.createElement('div')
			itemElem.innerHTML = `
        <p>${item.text}</p>
        <button class="isDone" data-text="${item.text}">${item.isDone ? 'Done' : 'Not Done'}</button>
        <button class="delete" data-text="${item.text}">X</button>
        <hr>
      `
			document.getElementById('items').append(itemElem)
		})
	})
	.catch(err => console.error(err))
