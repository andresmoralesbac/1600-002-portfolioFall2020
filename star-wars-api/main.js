import { films } from './data/films.js'
import { people } from './data/people.js'

// console.log(document.body.children)

const main = document.querySelector('main')

/* films.forEach(film => {
    console.log(film.title)
    let newTitle = main.appendChild(document.createElement("p"))
    newTitle.textContent = film.opening_crawl
}) */

people.forEach(person => {
    console.log(person.name)
    let personImg = document.createElement('img')
    personImg.src ="https://starwars-visualguide.com/assets/img/characters/10.jpg"
    main.appendChild(persomImg)
})