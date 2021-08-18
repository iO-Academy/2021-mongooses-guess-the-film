document.querySelector('#game_screen').hidden = true
document.querySelector('#end_screen').hidden = true


let submit_button = document.getElementById('submit_button')
let guess = document.getElementById('guess')
let answer_element = document.getElementById('answer')
let answer = answer_element.textContent
let incorrect_response = document.getElementById('incorrect_response')
let correct_response = document.getElementById('correct_response')
let correct_element = document.querySelector('#correct_incorrect');

answer_element.hidden = true;
incorrect_response.hidden = true;
correct_response.hidden = true;

submit_button.addEventListener("click", function () {
    incorrect_response.hidden = true;
    correct_element.hidden = false;
    correct_response.hidden = true;
    let player_guess = guess.value
    if(player_guess.toLowerCase() === answer.toLowerCase()) {
        correct_response.hidden = false
        console.log('correct')
    } else {
        incorrect_response.hidden = false;
        console.log('incorrect')
    }
    guess.value = ''
})


function shuffle_array(array) {
    for (let index = array.length - 1; index > 0; index--) {
        let random_index = Math.floor(Math.random() * (index + 1));
        let temp = array[index];
        array[index] = array[random_index];
        array[random_index] = temp;
    }
    return array
}

function get_new_question() {
    if (remaining_movies.length < 1){
        let user_feedback_element = document.querySelector('#user_feedback');
        user_feedback_element.innerHTML = '<h3>You have run out of questions</h3>';
    } else {
        let current_movie = remaining_movies.pop();
        let quote_element = document.querySelector('#quote');
        quote_element.textContent = current_movie.quote;

        let answer_element = document.querySelector('#answer');
        answer_element.hidden = true;
        answer_element.innerHTML = '<h2>' + current_movie.title + '</h2>';

        let correct_element = document.querySelector('#correct_incorrect');
        correct_element.innerHTML = '';
        correct_element.hidden = true;
    }
}

let remaining_movies = {}
document.querySelector('#start_button').addEventListener('click', (e) => {
    document.querySelector('#start_screen').hidden = true
    document.querySelector('#game_screen').hidden = false
    fetch("src/films.json")
        .then(data => data.json())
        .then((data) => {
            remaining_movies = shuffle_array(data.films)
            get_new_question()
        })
})
