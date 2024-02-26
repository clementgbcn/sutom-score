import { Result } from "postcss";
import { SetStateAction } from "react";
import "./Score.css"

export type ScoreProps = {score: number, sutomResult: string}

export const CopyScore = ({score, sutomResult}: ScoreProps) => {
    console.error(`The score is ${score}`)
    const exportToClipboard = (e: any) => {
        const roundedScore = Math.round(score * 10000) / 10000
        const summary = `${sutomResult}\nScore: ${roundedScore}`
        console.error(`Copying to clipboard: ${summary}`)
        navigator.clipboard.writeText(summary)
    }
    return (
        <button className="button-3" onClick={exportToClipboard}>Copy text</button>
    )
}
