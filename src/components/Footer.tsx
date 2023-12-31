/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Footer = () => {
  // CSS
  const footerStyle = css`
    font-size: 0.8rem;
    text-align: center;
    margin-top: 30px;
  `

  return (
    <footer css={footerStyle}>
      Created by <a href="https://twitter.com/meimei_kr_">meimei</a>
    </footer>
  )
}

export default Footer