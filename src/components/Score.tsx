/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { SUCCESS_SCORE } from '../constants'

type ScoreProps = {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  // CSS
  const spanStyle = css`
    margin-right: 30px;

    @media screen and (max-width: 500px) {
      margin-right: 0;
    }
  `

  const scoreStyle = css`
    font-size: 2rem;
    font-weight: bold;
    padding: 0 5px;
    color: ${score >= SUCCESS_SCORE ? '#C40D17' : 'initial'};
  `

  return (
    <span css={spanStyle}>
      得点: <span css={scoreStyle}>{score}</span>点
    </span>
  )
}

export default Score