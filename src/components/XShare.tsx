/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { TwitterShareButton, XIcon } from 'react-share'
import { APP_URL } from '../constants'

type XSharePropsType = {
  message: string;
}

const XShare: React.FC<XSharePropsType> = ({ message }) => {
  // CSS
  const shareBtnStyle = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    background-color: #040404;
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    margin-left: 10px;

    &:hover {
      opacity: 0.8;
    }

    @media screen and (max-width: 500px) {
      margin-top: 20px;
      margin-left: 0;
      margin-bottom: 30px;
    }
  `

  return (
    <TwitterShareButton url={APP_URL} title={message}>
      <div css={shareBtnStyle}>
        <XIcon size={24} />
        <div> シェア</div>
      </div>
    </TwitterShareButton>
  )
}

export default XShare