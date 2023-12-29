/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import hole from './assets/hole.png'
import mole from './assets/mole.png'
import hammer from './assets/hammer.png'
import redMole from './assets/rainbow-mole.png'
import blueMole from './assets/blue-mole.png'

const SUCCESS_SCORE = 10

const App = () => {
  const [moles, setMoles] = useState<{ isVisible: boolean, moleType: number }[]>(
    [...Array(9)].fill({ isVisible: false, moleType: 0 })
  ) // moleType: 0 -> 普通のモグラ, 1 -> 青モグラ, 2 -> 虹モグラ
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

  const getMoleTyoe = () => {
    const random = Math.random()
    if (random < 0.1) {
      return 2 // 10% の確率で虹モグラ
    } else if (random < 0.3) {
      return 1 // 20% の確率で青モグラ
    } else {
      return 0 // 70% の確率で普通のモグラ
    }
  }

  const setMoleVisibility = (index: number, isVisible: boolean) => {
    setMoles((prevMoles) => {
      const newMoles = [...prevMoles]
      const moleType = isVisible ? getMoleTyoe() : 0
      newMoles[index] = { isVisible, moleType }
      return newMoles
    })
  }

  const handleClick = (index: number) => {
    setMoleVisibility(index, false)
    setScore((prevScore) => {
      let newScore: number = prevScore;
      switch (moles[index].moleType) {
        case 0:
          newScore = prevScore + 1
          break
        case 1:
          newScore = prevScore - 1
          break
        case 2:
          newScore = prevScore + 2
          break
      }

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

  const getMoleImage = (isVisible: boolean, moleType: number) => {
    if (isVisible) {
      switch (moleType) {
        case 0:
          return mole
        case 1:
          return blueMole
        case 2:
          return redMole
      }
    } else {
      return hole
    }
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
        {remainingTime <= 0 ? <span>時間切れです。またチャレンジしてね！</span> : <span>残り時間: {remainingTime}秒</span>}
      </div>
      {
        isSuccess || remainingTime <= 0
          ? <button css={buttonStyle} onClick={handleRestart}>R E S T A R T</button>
          : <button css={buttonStyle} onClick={handleStart}>S T A R T</button>
      }
      <div css={gridStyle}>
        {moles.map((mole, index) => (
          <img key={index} src={getMoleImage(mole.isVisible, mole.moleType)} onClick={() => mole.isVisible && handleClick(index)} />
        ))}
      </div>
    </>
  )
}

export default App