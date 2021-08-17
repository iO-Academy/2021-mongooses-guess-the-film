let submit_button = document.getElementById('submit_button')
let guess = document.getElementById('guess')
let answer_element = document.getElementById('answer')
let answer = answer_element.textContent
let incorrect_response = document.getElementById('incorrect_response')
let correct_response = document.getElementById('correct_response')

answer_element.hidden = true;
incorrect_response.hidden = true;
correct_response.hidden = true;

submit_button.addEventListener("click", function () {
    incorrect_response.hidden = true;
    correct_response.hidden = true;
    let player_guess = guess.value
    if(player_guess.toLowerCase() === answer.toLowerCase()) {
        correct_response.hidden = false
    } else {
        incorrect_response.hidden = false;
    }
    guess.value = ''
})




