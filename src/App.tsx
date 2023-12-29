/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import hole from './assets/hole.png'
import mole from './assets/mole.png'
import hammer from './assets/hammer.png'

const SUCCESS_SCORE = 20

const App = () => {
  const [moles, setMoles] = useState<boolean[]>([...Array(9)].fill(false))
  const [score, setScore] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [remainingTime, setRemainingTime] = useState<number>(60)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying && score < SUCCESS_SCORE && remainingTime > 0) {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * moles.length)
        setMoleVisibility(randomIndex, true)
        setTimeout(() => {
          setMoleVisibility(randomIndex, false)
        }, 700)
      }, 1000)
    } else if (interval && (score >= SUCCESS_SCORE || remainingTime <= 0)) {
      setIsPlaying(false)
      clearInterval(interval)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [moles, isPlaying, score, remainingTime])

  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (remainingTime <= 0 && interval) {
      clearInterval(interval)
      setIsPlaying(false)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isPlaying, remainingTime])

  const setMoleVisibility = (index: number, isVisible: boolean) => {
    setMoles((prevMoles) => {
      const newMoles = [...prevMoles]
      newMoles[index] = isVisible
      return newMoles
    })
  }

  const handleClick = (index: number) => {
    setMoleVisibility(index, false)
    setScore((prevScore) => {
      const newScore = prevScore + 1
      if (newScore >= SUCCESS_SCORE) {
        setIsPlaying(false)
        setIsSuccess(true)
      }
      return newScore
    })
  }

  const handleStart = () => {
    setIsPlaying(true)
  }

  const handleRestart = () => {
    setIsPlaying(true)
    setScore(0)
    setRemainingTime(60)
    setIsSuccess(false)
  }

  // CSS
  const gridStyle = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 auto;
    width: 768px;
    cursor: url(${hammer}), pointer;
  `

  const h1Style = css`
    text-align: center;
  `
  const scoreTimeStyle = css`
    text-align: center;
  `

  const spanStyle = css`
    margin-right: 30px;
  `

  const successStyle = css`
    text-align: center;
    color: #C40D17;
    font-size: 1.5rem;
    font-weight: bold;
    height: 1.5rem;
  `

  const buttonStyle = css`
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    border-radius: 30px;
    border: none;
    background-color: #FB8B24;
    color: white;
    cursor: pointer;
  `

  return (
    <>
      <h1 css={h1Style}>モグラ叩き</h1>
      {isSuccess ? <p css={successStyle}>成功！</p> : <p css={successStyle}></p>}
      <div css={scoreTimeStyle}>
        <span css={spanStyle}>得点: {score}</span>
        {remainingTime <= 0 ? <span>時間切れ</span> : <span>残り時間: {remainingTime}秒</span>}
      </div>
      {isSuccess ? <button css={buttonStyle} onClick={handleRestart}>R E S T A R T</button>
                 : <button css={buttonStyle} onClick={handleStart}>S T A R T</button>}
      <div css={gridStyle}>
        {moles.map((isMole, index) => (isMole ?
          <img key={index} src={mole} onClick={() => handleClick(index)} /> :
          <img key={index} src={hole} />
        ))}
      </div>
    </>
  )
}

export default App