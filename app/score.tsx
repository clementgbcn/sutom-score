import { Result } from "postcss";
import { SetStateAction } from "react";
import "./Score.css";

export type ScoreProps = { score: number };

export const Score = ({ score }: ScoreProps) => {
  console.log(`The score is ${score}`);
  // Function to determine the color based on the value
  const getGradientColor = (value: number) => {
    const red = Math.floor((1 - value / 100) * 255);
    const green = Math.floor((value / 100) * 255);
    const blue = 0; // Keeping blue at 0 for the gradient between red and green
    return `rgb(${red}, ${green}, ${blue})`;
  };
  return (
    <div
      className="score"
      style={
        {
          "--percent": `${score}`,
          color: getGradientColor(score),
        } as React.CSSProperties
      }
    />
  );
};
