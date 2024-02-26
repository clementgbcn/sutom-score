import { Result } from "postcss";
import { SetStateAction } from "react";
import "./Score.css"

export type ScoreProps = {score: number}

export const Score = ({score}: ScoreProps) => {
    console.error(`The score is ${score}`)
    return (
        <div className="score" style={{"--percent": `${score}`}}/>
    )
}
