import { senators } from '../data/senators.js'
import { removeChildren } from '../utils/index.js'

const senatorGrid = document.querySelector('.senatorGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const birthdayButton = document.querySelector('#birthdayButton')
const loyaltyButton = document.querySelector('#loyaltyButton')

seniorityButton.addEventListener('click', () => {
    senioritySort()
})

birthdayButton.addEventListener('click', () => {
    birthdaySort()
})

loyaltyButton.addEventListener('click', () => {
    loyaltySort()
})

function populateSenatorDiv(simpleSenators) {
    removeChildren(senatorGrid)
    // console.log(simpleSenators)
    simpleSenators.forEach(senator => {
        let senDiv = document.createElement('div')
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')
        let partyIcon = document.createElement('i')
        let senInfo = document.createElement('p')
        senInfo.src = senator.office
        if (senator.party === 'R') partyIcon.className = 'fas fa-republican'
        if (senator.party === 'D') partyIcon.className = 'fas fa-democrat'
        if (senator.party === 'ID') partyIcon.className = 'fas fa-star'
        figImg.src = senator.imgURL
        figCaption.textContent = senator.name 
        figCaption.className = 'figcaption'
        figCaption.appendChild(partyIcon)
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        figCaption.appendChild(senInfo)
        senDiv.appendChild(senFigure)
        // senDiv.appendChild(progressBars(senator))
        senatorGrid.appendChild(senDiv)   
        figImg.className = 'senPic'
        senDiv.addEventListener('click', function () { 
            figImg.classList.toggle('figImg')
        })
        

        figImg.addEventListener('mouseenter', () => {
            if (senator.party === 'R') figImg.style.border = '5px solid red'
            if (senator.party === 'D') figImg.style.border = '5px solid blue'
            if (senator.party === 'ID') figImg.style.border = '5px solid gold'
            figImg.style.transition = 'border 0.2s'
        })

        figImg.addEventListener('mouseout', () => {
            if (senator.party === 'R') figImg.style.border = '3px solid lightgray'
            if (senator.party === 'D') figImg.style.border = '3px solid lightgray'
            if (senator.party === 'ID') figImg.style.border = '3px solid lightgray'
            figImg.style.transition = 'border 0.3s'
        })
        
    });
}

// function getSenAdd(senatorArray) {
//     return senatorArray.map(senator => {
//         let senAddress = senator.office
//         console.log(senAddress)
//     })
// }

function getSimplifiedSenators(senatorArray) {
    return senatorArray.map(senator => {
        let middleName = senator.middleName ? ` ${senator.middleName}` : ` `
        return {
            id:senator.id, 
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
            seniority: parseInt(senator.seniority, 10),
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
            party: senator.party,
            date_of_birth: parseInt(senator.date_of_birth, 10)

        }
    })
}

const filterSenators = (prop, value) => {
    return getSimplifiedSenators(senators).filter(senator =>{
        return senator[prop]
    })
}

const republicans = filterSenators('party', 'R')
const democrats = filterSenators('party', 'D')

const mostSeniority = getSimplifiedSenators(senators).reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)

const missedVotes = getSimplifiedSenators(senators).reduce((acc, senator) => acc.missedVotesPct > senator.missedVotesPct ? acc: senator)

function birthdaySort () {
    populateSenatorDiv(getSimplifiedSenators(senators).sort((a, b) => {
        return a.seniority - b.seniority
    }))
}

function loyaltySort () {
    populateSenatorDiv(getSimplifiedSenators(senators).sort((a, b) => {
        return a.loyaltyPct - b.loyaltyPct
    }))
}



function senioritySort () {
    populateSenatorDiv(getSimplifiedSenators(senators).sort((a, b) => {
        return a.date_of_birth - b.date_of_birth
    }))    
}


console.log(mostSeniority, missedVotes, republicans, democrats)
populateSenatorDiv(getSimplifiedSenators(senators))