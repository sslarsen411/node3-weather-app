const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const btnSubmit      = document.querySelector('button[type="submit"]')
//const para = document.querySelectorAll('p')
const messageOne = document.querySelector('#fb-1')
const messageTwo = document.querySelector('#fb-2')

//console.log(para)
//let x = weatherForm
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //console.log(search.value)
    const addr = encodeURIComponent(search.value)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //console.log(addr)
     
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



// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })

// })

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.title)
//             console.log(data.forecast)
//         }
//     })
// })