/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { SUCCESS_SCORE } from '../constants'
import smMole from '../assets/sm-mole.png'
import smBlueMole from '../assets/sm-blue-mole.png'
import smRainbowMole from '../assets/sm-rainbow-mole.png'

const Description = () => {
  // CSS
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

  return (
    <div css={descriptionStyle}>
      <div css={descInnerStyle}>
        <p css={pStyle}>{SUCCESS_SCORE}点取得でクリアです。</p>
        <p css={pStyle}>茶モグラ<img src={smMole} css={moleImageStyle} />:  + 1 点</p>
        <p css={pStyle}>青モグラ<img src={smBlueMole} css={moleImageStyle} />:  - 1 点</p>
        <p css={pStyle}>虹モグラ<img src={smRainbowMole} css={moleImageStyle} />:  + 2 点</p>
      </div>
    </div>
  )
}

export default Description