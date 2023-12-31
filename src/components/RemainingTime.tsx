/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useRef } from 'react'
import XShare from './XShare'
import { MESSAGE_FAIL } from '../constants'

type RemainingTimeProps = {
  isPlaying: boolean;
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;

}

const RemainingTime: React.FC<RemainingTimeProps> = ({ isPlaying, remainingTime, setRemainingTime }) => {
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

  // CSS
  const timeUpStyle = css`
    @media screen and (max-width: 500px) {
      display: inline-block;
    }
  `

  const displayStyle = css`
    font-size: 2rem;
    font-weight: bold;
    padding: 0 5px;
  `

  return (
    <>
      {
        remainingTime <= 0
          ? (
              <>
                <span css={timeUpStyle}>時間切れです。またチャレンジしてね！</span>
                <XShare message={MESSAGE_FAIL} />
              </>
            )
          : <span>残り時間: <span css={displayStyle}>{remainingTime}</span>秒</span>
      }
    </>
  )
}

export default RemainingTime