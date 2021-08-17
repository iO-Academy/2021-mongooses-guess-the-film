document.querySelector('#start_button').addEventListener('click', (e) => {
    document.querySelector('#start_screen').hidden = true
    document.querySelector('#game_screen').hidden = false
    fetch("src/films.json")
        .then(data => data.json())
        .then((data) => {
            let allFilms = shuffle(data.films)
            get_new_question()
        })
})

function shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
        let random_index = Math.floor(Math.random() * (index + 1));
        let temp = array[index];
        array[index] = array[random_index];
        array[random_index] = temp;
    }
    return array
}