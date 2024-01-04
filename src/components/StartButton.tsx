/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TIME_LIMIT, FOOTER_HEIGHT } from "../constants";

type StartButtonProps = {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const StartButton: React.FC<StartButtonProps> = ({
  isPlaying,
  setIsPlaying,
  setScore,
  setRemainingTime,
  setIsSuccess,
}) => {
  const scrollToBottom = () => {
    const viewportHeight = window.innerHeight; // ビューポートの高さ
    const totalScrollHeight = document.documentElement.scrollHeight; // 全体のスクロール可能な高さ
    const targetScrollTop = totalScrollHeight - viewportHeight - FOOTER_HEIGHT; // スクロールの目標位置

    window.scrollTo({
      top: targetScrollTop > 0 ? targetScrollTop : 0,
      behavior: "smooth",
    });
  };

  const handleStart = () => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
    setIsPlaying(true);
    setScore(0);
    setRemainingTime(TIME_LIMIT);
    setIsSuccess(false);
  };

  // CSS
  const buttonStyle = css`
    display: block;
    margin: 20px auto;
    padding: 20px 30px;
    border-radius: 30px;
    border: none;
    background-color: #fb8b24;
    color: white;
    cursor: ${isPlaying ? "not-allowed" : "pointer"};
    font-size: 1.5rem;

    &:hover {
      opacity: ${isPlaying ? 1 : 0.9};
    }

    &:active {
      transform: ${isPlaying ? "none" : "translate(0, 2px)"};
      opacity: ${isPlaying ? 1 : 0.9};
    }
  `;

  return (
    <button css={buttonStyle} onClick={handleStart} disabled={isPlaying}>
      S T A R T
    </button>
  );
};

export default StartButton;
