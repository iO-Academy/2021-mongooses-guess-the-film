let submit_button = document.getElementById('submit_button')
let input = document.getElementById('guess')
let answer = document.getElementById('answer')
let incorrect_response = document.getElementById('incorrect_response')
let correct_response = document.getElementById('correct_response')

submit_button.addEventListener("click", function () {
    let player_guess = input.value
    if(player_guess.toLowerCase() === answer.toLowerCase()) {
        correct_response.style.display="block"
    } else {
        incorrect_response.style.display="block"
    }
    input.value = ''
})




// if(!player_guess.match(/^[A-Za-z\s-!?:'"]+$/)) {