/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { useState, useEffect, useRef } from 'react'
import { useReward } from 'react-rewards'
import hole from './assets/hole.png'
import mole from './assets/mole.png'
import hammer from './assets/hammer.png'
import rainbowMole from './assets/rainbow-mole.png'
import blueMole from './assets/blue-mole.png'
import smMole from './assets/sm-mole.png'
import smBlueMole from './assets/sm-blue-mole.png'
import smRainbowMole from './assets/sm-rainbow-mole.png'

const SUCCESS_SCORE = 20

const App = () => {
  const [moles, setMoles] = useState<{ isVisible: boolean, moleType: number }[]>(
    [...Array(9)].fill({ isVisible: false, moleType: 0 })
  ) // moleType: 0 -> 普通のモグラ, 1 -> 青モグラ, 2 -> 虹モグラ
  const [score, setScore] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [remainingTime, setRemainingTime] = useState<number>(60)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const { reward } = useReward('rewardId', 'confetti', { lifetime: 1000, spread: 90 });

  // どのモグラがどの穴から出るかを決める
  const molesIntervalRef = useRef<number | null>(null)
  useEffect(() => {
    // ユーザーエージェントの文字列をチェックし、PCかどうかを判定
    const ua = navigator.userAgent
    const isPC = !/iPhone|Android|iPad|Mobile/i.test(ua)

    if (isPlaying && score < SUCCESS_SCORE && remainingTime > 0) {
      molesIntervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * moles.length)
        setMoleVisibility(randomIndex, true)
        setTimeout(() => {
          setMoleVisibility(randomIndex, false)
        }, isPC ? 700 : 500)
      }, isPC ? 800 : 600)
    } else if (molesIntervalRef.current && (score >= SUCCESS_SCORE || remainingTime <= 0)) {
      setIsPlaying(false)
      clearInterval(molesIntervalRef.current)
    }

    return () => {
      if (molesIntervalRef.current) {
        clearInterval(molesIntervalRef.current)
      }
    }
  }, [moles, isPlaying, score, remainingTime])

  // 残り時間のカウントダウン処理
  const timerIntervalRef = useRef<number | null>(null)
  useEffect(() => {
    if (isPlaying && remainingTime > 0) {
      timerIntervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (remainingTime <= 0 && timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [isPlaying, remainingTime])

  // 成功メッセージのアニメーション
  useEffect(() => {
    if (isSuccess) {
      const messageEl = document.querySelector('.message')
      if (!messageEl) return
      messageEl.classList.add('animate')
    }
  }, [isSuccess])

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
        reward()
      }
      return newScore
    })
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  const handleStart = () => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
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
          return rainbowMole
      }
    } else {
      return hole
    }
  }

  // CSS
  const containerStyle = css`
    width: 100%;
  `

  const gridStyle = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 auto 30px;
    width: 768px;
    cursor: url(${hammer}), pointer;

    @media screen and (max-width: 500px) {
      width: 90vw;
      margin: 0 auto 150px;
    }
  `

  const imageStyle = css`
    width: 100%;
    height: auto;
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
  `

  const spanStyle = css`
    margin-right: 30px;
  `

  const displayStyle = css`
    font-size: 2rem;
    font-weight: bold;
    padding: 0 5px;
  `

  const timeUpStyle = css`
    @media screen and (max-width: 500px) {
      display: inline-block;
    }
  `

  const scoreStyle = css`
    ${displayStyle}
    color: ${score >= SUCCESS_SCORE ? '#C40D17' : 'initial'};
  `

  const textAnimation = keyframes`
    0% {
      transform: translateY(-1rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `

  const successStyle = css`
    text-align: center;
    color: #C40D17;
    font-weight: bold;
    font-size: 1.5rem;
    height: 2rem;
    margin: 10px 0;
    &.animate span {
      display: inline-block;
      letter-spacing: -0.15rem;
      animation: ${textAnimation} 0.8s forwards;
      transform: translateY(-1rem);
      opacity: 0;
    }
    &.animate span:nth-of-type(1) {
      animation-delay: 0s;
    }
    &.animate span:nth-of-type(2) {
      animation-delay: 0.2s;
    }
    &.animate span:nth-of-type(3) {
      animation-delay: 0.4s;
    }
    &.animate span:nth-of-type(4) {
      animation-delay: 0.6s;
    }
    &.animate span:nth-of-type(5) {
      animation-delay: 0.8s;
    }
    &.animate span:nth-of-type(6) {
      animation-delay: 1s;
    }
    &.animate span:nth-of-type(7) {
      animation-delay: 1.2s;
    }
    &.animate span:nth-of-type(8) {
      animation-delay: 1.4s;
    }
    &.animate span:nth-of-type(9) {
      animation-delay: 1.6s;
    }
    &.animate span:nth-of-type(10) {
      animation-delay: 1.8s;
    }
    &.animate span:nth-of-type(11) {
      animation-delay: 2s;
    }
  `

  const buttonStyle = css`
    display: block;
    margin: 20px auto;
    padding: 20px 30px;
    border-radius: 30px;
    border: none;
    background-color: #FB8B24;
    color: white;
    cursor: ${isPlaying ? 'not-allowed' : 'pointer'};
    font-size: 1.5rem;

    &:hover {
      opacity: ${isPlaying ? 1 : 0.9};
    }

    &:active {
      transform: ${isPlaying ? 'none' : 'translate(0, 2px)'};
      opacity: ${isPlaying ? 1 : 0.9};
    }
  `

  const confettiStyle = css`
    position: absolute;
    top: 0;
    left: 50%;
  `
  const descriptionStyle = css`
    width: 220px;
    height: 150px;
    background-color: #fff;
    padding: 30px;
    border: none;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;

    @media screen and (max-width: 500px) {
      margin-right: 0;
      margin-bottom: 30px;
    }
  `
  const descInnerStyle = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `

  const pStyle = css`
    margin: 0 0 10px;
  `

  const moleImageStyle = css`
    height: 2rem;
    margin: 0 10px;
    vertical-align: bottom;
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
      <h1 css={h1Style}>モグラたたき</h1>
      <div css={sectionStyle}>
        <div css={descriptionStyle}>
          <div css={descInnerStyle}>
            <p css={pStyle}>{SUCCESS_SCORE}点取得でクリアです。</p>
            <p css={pStyle}>茶モグラ<img src={smMole} css={moleImageStyle} />:  + 1 点</p>
            <p css={pStyle}>青モグラ<img src={smBlueMole} css={moleImageStyle} />:  - 1 点</p>
            <p css={pStyle}>虹モグラ<img src={smRainbowMole} css={moleImageStyle} />:  + 2 点</p>
          </div>
        </div>
        <div>
          <div css={scoreTimeStyle}>
            <span css={spanStyle}>得点: <span css={scoreStyle}>{score}</span>点</span>
            {
              remainingTime <= 0
                ? <span css={timeUpStyle}>時間切れです。またチャレンジしてね！</span>
                : <span>残り時間: <span css={displayStyle}>{remainingTime}</span>秒</span>
            }
          </div>
          <button css={buttonStyle} onClick={handleStart} disabled={isPlaying}>S T A R T</button>
        </div>
      </div>
      <div>
        {
          isSuccess
            ? <p className="message" css={successStyle}>
                <span>お</span>
                <span>め</span>
                <span>で</span>
                <span>と</span>
                <span>う</span>
                <span>！</span>
                <span>成</span>
                <span>功</span>
                <span>で</span>
                <span>す</span>
                <span>！</span>
              </p>
            : <p css={successStyle}></p>
          }
      </div>
      <div css={gridStyle}>
        {moles.map((mole, index) => (
          <img
            draggable="false"
            key={index}
            src={getMoleImage(mole.isVisible, mole.moleType)}
            css={imageStyle}
            onClick={() => mole.isVisible && handleClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default App