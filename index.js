function shuffle_array(array) {
    for (let index = array.length - 1; index > 0; index--) {
        let random_index = Math.floor(Math.random() * (index + 1))
        let temp = array[index]
        array[index] = array[random_index]
        array[random_index] = temp
    }
    return array
}

function get_new_question() {
    if (remaining_movies.length < 1){
        let user_feedback_element = document.getElementById('user_feedback')
        user_feedback_element.innerHTML = '<h3>You have run out of questions</h3>'
    } else {
        let current_movie = remaining_movies.pop()
        let quote_element = document.getElementById('quote')
        quote_element.textContent = current_movie.quote
        let answer_element = document.getElementById('answer')
        answer_element.dataset.year = current_movie.year
        answer_element.dataset.title = current_movie.title
        answer_element.style.display = 'none'
        answer_element.innerHTML = '<h2>' + current_movie.title + '</h2>'
        let correct_incorrect_elem = document.getElementById('correct_incorrect')
        correct_incorrect_elem.style.display = 'none'
    }
}

function get_hint () {
    fetch('src/films.json')
        .then(data => data.json())
        .then((data) => {
            let answer_year = document.getElementById('answer').dataset.year
            let answer_title = document.getElementById('answer').dataset.title
            let movie_titles = (data.films).map(movie => movie.title)
            let filtered_movies =  movie_titles.filter(movie => movie !== answer_title)
            let hints = shuffle_array(filtered_movies).slice(0, 2)
            hints.push(answer_title)
            shuffle_array(hints)

            document.getElementById('hint').innerHTML = '<p>This Movie was released in: ' + answer_year + '</p> <ul><li>' + hints[0] + '</li><li>' + hints[1]+ '</li><li>' + hints[2] + '</li></ul>'
            document.getElementById('hint').style.display = 'block'
        })
}

let remaining_movies = {}
document.getElementById('submit_button').addEventListener('click', function () {
    let guess = document.getElementById('guess')
    let player_guess = guess.value
    let answer = document.getElementById('answer').textContent
    let correct_response = document.getElementById('correct_response')
    let incorrect_response = document.getElementById('incorrect_response')
    let hint_button = document.getElementById('hint_button')
    if(player_guess.toLowerCase() === answer.toLowerCase()) {
        let reveal_button = document.getElementById('reveal_button')
        reveal_button.disabled = true
        correct_response.style.display = 'block'
        submit_button.disabled = true
        hint_button.disabled = true
        incorrect_response.style.display = 'none'
        guess.value = ''
        document.getElementById('next_question_button').disabled = false
    } else {
        correct_response.style.display = 'none'
        incorrect_response.style.display = 'block'
    }
    let correct_incorrect_elem = document.getElementById('correct_incorrect')
    correct_incorrect_elem.style.display = 'block'
    let user_feedback_elem = document.getElementById('user_feedback')
    user_feedback_elem.style.display = 'block'
})

document.getElementById('next_question_button').addEventListener('click', function () {
    document.getElementById('hint_button').disabled = false
    document.getElementById('hint').style.display = 'none'
    let reveal_button = document.getElementById('reveal_button')
    reveal_button.disabled = false
    let submit_button = document.getElementById('submit_button')
    submit_button.disabled = false
    document.getElementById('next_question_button').disabled = true
    document.getElementById('guess').value = ''
    get_new_question()
})

document.getElementById('start_button').addEventListener('click', (e) => {
    document.getElementById('start_screen').style.display = 'none'
    document.getElementById('game_screen').style.display = 'block'
    document.getElementById('next_question_button').disabled = true
    fetch('src/films.json')
        .then(data => data.json())
        .then((data) => {
            remaining_movies = shuffle_array(data.films)
            get_new_question()
        })
})

document.getElementById('reveal_button').addEventListener('click', (e) => {
    document.getElementById('answer').style.display ='block'
    document.getElementById('next_question_button').disabled = false
    document.getElementById('hint_button').disabled = true
    document.getElementById('reveal_button').disabled = true
    let submit_button = document.getElementById('submit_button')
    submit_button.disabled = true
})

document.getElementById('hint_button').addEventListener('click', (e) => {
    document.getElementById('hint_button').disabled = true
    get_hint()
})
