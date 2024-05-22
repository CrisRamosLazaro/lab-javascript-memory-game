const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards)

const countdownText = document.getElementById("countdown")
const lastChanceText = document.getElementById("last-chance")
const victoryBox = document.getElementById("victory-box")
const victoryMsg = document.getElementById("victory")

victoryBox.style.display = "none"
victoryMsg.style.display = "none"

window.addEventListener('load', () => {

  memoryGame.shuffleCards()

  let html = '';

  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `
  })

  document.querySelector('#memory-board').innerHTML = html

  setInterval(() => {
    memoryGame.changeCountdownText(countdownText)
  }, 1000)

  setTimeout(() => {
    lastChanceText.style.display = "block"
  }, 3000)

  setTimeout(() => {
    countdownText.style.opacity = "0"
    lastChanceText.style.opacity = "0"

    setTimeout(() => {
      countdownText.style.display = "none"
      lastChanceText.style.display = "none"
    }, 1000)
  }, 9000)

  document.querySelectorAll('.card').forEach((card) => {
    card.classList.add('turned')
    setTimeout(() => {
      card.classList.remove('turned')

    }, 9000)

    card.addEventListener('click', () => {

      card.classList.add('turned')
      memoryGame.pickedCards.push(card)

      if (memoryGame.pickedCards.length === 2) {
        const card1 = memoryGame.pickedCards[0].getAttribute('data-card-name')
        const card2 = memoryGame.pickedCards[1].getAttribute('data-card-name')

        if (!memoryGame.checkIfPair(card1, card2)) {
          setTimeout(() => {
            memoryGame.pickedCards.forEach((card) => card.classList.remove('turned'))
            memoryGame.pickedCards = []
          }, 1000)
        } else {
          document.getElementById('pairs-guessed').innerHTML = memoryGame.pairsGuessed
          memoryGame.pickedCards = []
        }
      }

      document.getElementById('pairs-clicked').innerHTML = memoryGame.pairsClicked

      if (memoryGame.checkIfFinished()) {
        victoryBox.style.display = "flex"
        victoryMsg.style.display = "block"
        setInterval(() => {
          memoryGame.changeVictoryMsg(victoryBox, victoryMsg)
        }, 300)
      }

    })
  })
})