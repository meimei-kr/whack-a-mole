/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import hole from '../assets/hole.png'
import mole from '../assets/mole.png'
import rainbowMole from '../assets/rainbow-mole.png'
import blueMole from '../assets/blue-mole.png'

type MoleProps = {
  isVisible: boolean;
  moleType: number;
  onClick: () => void;
}

const Mole: React.FC<MoleProps> = ({ isVisible, moleType, onClick }) => {
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
  const imageStyle = css`
    width: 100%;
    height: auto;
  `

  return (
    <img
      draggable="false"
      src={getMoleImage(isVisible, moleType)}
      css={imageStyle}
      onClick={onClick}
    />
  )
}

export default Mole