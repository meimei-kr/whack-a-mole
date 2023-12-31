/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { useReward } from 'react-rewards'

import Description from './components/Description'
import MoleGrid from './components/MoleGrid'
import Footer from './components/Footer'
import RemainingTime from './components/RemainingTime'
import Score from './components/Score'
import SuccessMessage from './components/SuccessMessage'
import { TIME_LIMIT } from './constants'
import StartButton from './components/StartButton'

const App = () => {
  const [score, setScore] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [remainingTime, setRemainingTime] = useState<number>(TIME_LIMIT)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const { reward } = useReward('rewardId', 'confetti', { lifetime: 1000, spread: 90 });

  // CSS
  const containerStyle = css`
    width: 100%;
  `

  const h1Style = css`
    text-align: center;
    color: #fff;
    text-shadow: /* 黒色の縁取り */
      -1px -1px 0 #000, // 左上に黒い影
      1px -1px 0 #000, // 右上に黒い影
      -1px  1px 0 #000, // 左下に黒い影
      1px  1px 0 #000; // 右下に黒い影
    margin: 30px 0 20px;
  `
  const scoreTimeStyle = css`
    text-align: center;

    @media screen and (max-width: 500px) {
      display: flex;
      flex-direction: column;
    }
  `

  const confettiStyle = css`
    position: absolute;
    top: 0;
    left: 50%;
  `

  const sectionStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
  `

  return (
    <div css={containerStyle}>
      <div css={confettiStyle} id="rewardId"></div>
      <h1 css={h1Style}>モグラたたきマスター</h1>
      <div css={sectionStyle}>
        <Description />
        <div>
          <div css={scoreTimeStyle}>
            <Score score={score} />
            <RemainingTime isPlaying={isPlaying} remainingTime={remainingTime} setRemainingTime={setRemainingTime} />
          </div>
          <StartButton
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setScore={setScore}
            setRemainingTime={setRemainingTime}
            setIsSuccess={setIsSuccess}
          />
        </div>
      </div>
      <SuccessMessage isSuccess={isSuccess} />
      <MoleGrid
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        score={score}
        setScore={setScore}
        remainingTime={remainingTime}
        setIsSuccess={setIsSuccess}
        reward={reward}
      />
      <Footer />
    </div>
  )
}

export default App