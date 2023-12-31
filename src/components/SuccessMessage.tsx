/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { useEffect } from 'react'
import XShare from './XShare'
import { MESSAGE_SUCCESS } from '../constants'

type SuccessMessageProps = {
  isSuccess: boolean
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ isSuccess }) => {
  // 成功メッセージのアニメーション
  useEffect(() => {
    if (isSuccess) {
      const messageEl = document.querySelector('.message')
      if (!messageEl) return
      messageEl.classList.add('animate')
    }
  }, [isSuccess])

  // CSS
  const successAreaStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
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
    font-size: 1.25rem;
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

  return (
    <div css={successAreaStyle}>
      {
        isSuccess
          ? (
              <>
                <p className="message" css={successStyle}>
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
                <XShare message={MESSAGE_SUCCESS} />
              </>
            )
          : <p css={successStyle}></p>
        }
    </div>
  )
}

export default SuccessMessage