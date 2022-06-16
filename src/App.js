import { useState, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [time, setTime] = useState(() => new Date())
  const [bestTime, setBestTime] = useState(
    () => JSON.parse(localStorage.getItem('bestTime')) || []
  )

  useEffect(() => {
    const firstValue = dice[0].value
    const hasWon = dice.every((die) => die.isHeld && die.value === firstValue)
    if (hasWon) {
      setTenzies(true)
      setTime((oldTime) => new Date() - oldTime)
    }
  }, [dice])

  // useEffect(() => {
  //   if (tenzies) {
  //     localStorage.setItem('bestTime', JSON.stringify(bestTime))
  //   }
  // }, [tenzies])

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }
  }

  function allNewDice() {
    let array = []
    for (let i = 0; i < 10; i++) {
      array.push(generateNewDie())
    }
    return array
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
      setRolls(0)
      setTime(new Date())
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
      setRolls((prevRolls) => prevRolls + 1)
    }
    if (dice.every((die) => !die.isHeld)) {
      setTime(new Date())
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function formatTime(elapsed) {
    var milliseconds = Math.floor((elapsed % 1000) / 100),
      seconds = Math.floor((elapsed / 1000) % 60),
      minutes = Math.floor((elapsed / (1000 * 60)) % 60),
      hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <>
      {tenzies && (
        <h2 className="winning--lbl">
          You won with only {rolls} rolls!
          <br />
          Your time: {formatTime(time)}
        </h2>
      )}
      <main>
        {tenzies && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls. To start timer unselect all dice and
          click on 'Roll'
        </p>
        <div className="dice-grid">{diceElements}</div>
        <button className="roll--button" onClick={rollDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </main>
    </>
  )
}
