/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect, useRef } from 'react'
import { SUCCESS_SCORE } from '../constants'
import hammer from '../assets/hammer.png'
import hole from '../assets/hole.png'
import mole from '../assets/mole.png'
import rainbowMole from '../assets/rainbow-mole.png'
import blueMole from '../assets/blue-mole.png'

type MoleGridProps = {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  remainingTime: number;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  reward: () => void;
}

const MoleGrid: React.FC<MoleGridProps> = ({ isPlaying, setIsPlaying, score, setScore, remainingTime, setIsSuccess, reward }) => {
  const [moles, setMoles] = useState<{ isVisible: boolean, moleType: number }[]>(
    [...Array(9)].fill({ isVisible: false, moleType: 0 })
  ) // moleType: 0 -> 普通のモグラ, 1 -> 青モグラ, 2 -> 虹モグラ

  // どのモグラがどの穴から出るかを決める
  const molesIntervalRef = useRef<number | null>(null)
  useEffect(() => {
    // ユーザーエージェントの文字列をチェックし、PCかどうかを判定
    const ua = navigator.userAgent
    const isPC = !/iPhone|Android|iPad|Mobile/i.test(ua)

    if (isPlaying && score < SUCCESS_SCORE && remainingTime > 0) {
      molesIntervalRef.current = setInterval(() => {
        // 最初のモグラを表示
        const randomIndex = Math.floor(Math.random() * moles.length);
        setMoleVisibility(randomIndex, true);
        setTimeout(() => {
          setMoleVisibility(randomIndex, false);
        }, isPC ? 800 : 600);

        // 少し遅れて二つ目のモグラを表示
        setTimeout(() => {
          let randomOtherIndex: number;
          do {
            randomOtherIndex = Math.floor(Math.random() * moles.length);
          } while (randomOtherIndex === randomIndex); // randomIndexとの重複を避ける

          setMoleVisibility(randomOtherIndex, true);
          setTimeout(() => {
            setMoleVisibility(randomOtherIndex, false);
          }, isPC ? 800 : 600); // 2つ目のモグラが表示されてから非表示になるまでの時間
        }, isPC ? 400 : 300); // 遅延時間
      }, isPC ? 900 : 700);

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

  const setMoleVisibility = (index: number, isVisible: boolean) => {
    setMoles((prevMoles) => {
      const newMoles = [...prevMoles]
      const moleType = isVisible ? getMoleType() : 0
      newMoles[index] = { isVisible, moleType }
      return newMoles
    })
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

  const getMoleType = () => {
    const random = Math.random()
    if (random < 0.1) {
      return 2 // 10% の確率で虹モグラ
    } else if (random < 0.3) {
      return 1 // 20% の確率で青モグラ
    } else {
      return 0 // 70% の確率で普通のモグラ
    }
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

  // CSS
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

  return (
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
  )
}

export default MoleGrid