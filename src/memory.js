class MemoryGame {
  constructor(cards) {
    this.cards = cards
    this.pickedCards = []
    this.pairsClicked = 0
    this.pairsGuessed = 0
    this.countdown = 5
  }

  shuffleCards() {
    const shuffledCards = []

    if (!this.cards) {
      return undefined
    }

    while (this.cards.length > 0) {
      const i = Math.floor(Math.random() * this.cards.length)
      const card = this.cards.splice(i, 1)
      shuffledCards.push(card[0])
    }

    this.cards = shuffledCards
    return shuffledCards
  }

  checkIfPair(card1, card2) {
    this.pairsClicked++
    if (card1 === card2) {
      this.pairsGuessed++
      return true
    }
    return false
  }

  checkIfFinished() {
    if (this.pairsClicked === 0) {
      return false
    }

    if (this.pairsGuessed === this.cards.length / 2) {
      return true
    }

    return false
  }

  animateVictory(a) {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  changeBgColor(box) {
    box.style.backgroundColor = this.animateVictory(0.4)
  }

  changeTextColor(text) {
    text.style.color = this.animateVictory(0.9)
  }

  changeVictoryMsg(box, text) {
    this.changeBgColor(box)
    this.changeTextColor(text)
  }

  changeCountdownText(text) {

    if (text.innerHTML == "READY") {
      text.innerHTML = "SET"
    } else if (text.innerHTML == "SET") {
      text.innerHTML = "GO"
    } else if (text.innerHTML == "GO") {
      text.innerHTML = this.countdown
      this.countdownStarted = true
    } else if (this.countdownStarted && this.countdown > 0) {
      this.countdown--
      text.innerHTML = this.countdown
    }
  }
}

