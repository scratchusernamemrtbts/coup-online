import constants from "../utilities/constants.js"

export const buildDeck = () => {
  let deck = []
  let cardNames = constants.CardNames.values()
  for (let card of cardNames) {
    addToDeck(card, deck)
  }

  deck = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return deck
}

export function addToDeck(cardName, deck) {
  if (!cardName || !deck) {
    console.log("cardName and deck must not be undefined.")
    return
  }
  for (let i = 0; i < 3; i++) {
    deck.push(cardName)
  }
}

export const shuffleArray = (arr) => {
  if (!arr) {
    console.log(`arr must not be undefined. arr was ${arr}`)
  }

  for (let i = 0; i < arr.length * 2; i++) {
    const one = i % arr.length
    const two = Math.floor(Math.random() * (arr.length - 1))
    let temp = arr[one]
    arr[one] = arr[two]
    arr[two] = temp
  }
  return arr
}

export const buildNameSocketMap = (players) => {
  let map = {}
  players.map((x) => {
    map[x.name] = x.socketID
  })
  return map
}

export const buildNameIndexMap = (players) => {
  let map = {}
  players.map((x, index) => {
    map[x.name] = index
  })
  return map
}

export const buildPlayers = (players) => {
  colors = [
    "#73C373",
    "#7AB8D3",
    "#DD6C75",
    "#8C6CE6",
    "#EA9158",
    "#CB8F8F",
    "#FFC303",
  ]
  shuffleArray(colors)

  players.forEach((x) => {
    delete x.chosen
    x.money = 2
    x.influences = []
    x.isDead = false
    x.color = colors.pop()
    delete x.isReady
  })
  console.log(players)
  return players
}

export const exportPlayers = (players) => {
  players.forEach((x) => {
    delete x.socketID
  })
  return players
}

export default {}