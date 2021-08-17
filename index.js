// GET NEW QUESTION
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