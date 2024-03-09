import { useEffect, useState } from "react";
import "./Score.css";
import "./CopyScore.css";

export type ScoreProps = { score: number; sutomResult: string };

const emojiResult = ["😭", "😞", "🔥", "🚀", "🎯"];

export const CopyScore = ({ score, sutomResult }: ScoreProps) => {
  console.error(`The score is ${score}`);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    var timer: NodeJS.Timeout;
    if (showPopover) {
      // Set a timer to hide the popover after 3 seconds (3000 milliseconds)
      timer = setTimeout(() => setShowPopover(false), 1000);
    }
    return () => clearTimeout(timer); // Clean up the timer
  }, [showPopover]);

  const exportToClipboard = (e: any) => {
    const roundedScore = Math.round(score * 10000) / 10000;
    const cropResult = sutomResult.replace("https://sutom.nocle.fr", "");
    const emoji = emojiResult[Math.round(score / 25)];
    const summary = `${cropResult}Score: ${roundedScore} ${emoji}`;
    navigator.clipboard.writeText(summary);
    // Show the popover
    setShowPopover(true);
  };

  return (
    <div className="actionButtonContainer">
      <button className="button-3" onClick={exportToClipboard}>
        Copy text
      </button>
      {showPopover && <div className="popover">Result saved to Clipboard</div>}
    </div>
  );
};
