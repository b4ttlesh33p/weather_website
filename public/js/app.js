console.log('clinet side JS is loaded!')

const button = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

button.addEventListener('submit',  (e) =>{
    e.preventDefault();

    const location = search.value
    console.log(location);

    msg1.textContent = "loading"
    fetch(`/weather?search=${location}`).then((response) =>{
    response.json().then((data) =>{
        if (data.error){
            console.log('invalid search')
            msg1.textContent = ('invalid search')
        } else {
            msg1.textContent = data.feelslike
            console.log(data)
        }
    })
})
})

