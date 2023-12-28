/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import hole from './assets/hole.png'
import mole from './assets/mole.png'

const App = () => {
  const [moles, setMoles] = useState<boolean[]>([...Array(9)].fill(false))
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length)
      setMoleVisibility(randomIndex, true)
      setTimeout(() => {
        setMoleVisibility(randomIndex, false)
      }, 700)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [moles])

  const setMoleVisibility = (index: number, isVisible: boolean) => {
    setMoles((prevMoles) => {
      const newMoles = [...prevMoles]
      newMoles[index] = isVisible
      return newMoles
    })
  }

  const handleClick = (index: number) => {
    setMoleVisibility(index, false)
    setScore((prevScore) => prevScore + 1)
  }

  // CSS
  const gridStyle = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 auto;
    width: 768px;
  `
  const h1Style = css`
    text-align: center;
  `

  return (
    <>
      <h1 css={h1Style}>Score: {score}</h1>
      <div css={gridStyle}>
        {moles.map((isMole, index) => (isMole ?
          <img src={mole} onClick={() => handleClick(index)} /> :
          <img src={hole} />
        ))}
      </div>
    </>
  )
}

export default App