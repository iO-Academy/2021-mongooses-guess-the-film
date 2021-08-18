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

        let answer_element = document.querySelector('#answer_output');
        answer_element.hidden = true;
        answer_element.innerHTML = '<h2>' + current_movie.title + '</h2>';

        let correct_element = document.querySelector('#correct');
        correct_element.innerHTML = '';
        correct_element.hidden = true;
    }
}

let remaining_films = {}
document.querySelector('#start_button').addEventListener('click', (e) => {
    document.querySelector('#start_screen').hidden = true
    document.querySelector('#game_screen').hidden = false
    fetch("src/films.json")
        .then(data => data.json())
        .then((data) => {
            remaining_films = shuffle_array(data.films)
            get_new_question()
        })
})