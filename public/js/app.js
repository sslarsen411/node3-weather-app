const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const btnSubmit      = document.querySelector('button[type="submit"]')
const messageOne = document.querySelector('#fb-1')
const messageTwo = document.querySelector('#fb-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const addr = encodeURIComponent(search.value)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
     
    fetch('/weather?address=' + addr).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.title
                messageTwo.textContent = data.forecast
            }
        })
    })

})