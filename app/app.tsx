"use client"; // This is a client component 👈🏽

import exp from "constants";
import { ResultForm} from "./resultForm";
import { useState } from "react";
import { Score } from "./score";
import { CopyScore } from "./copyScore";

const sutomResultFirstLine = RegExp("^#SUTOM #(\\d+) (\\d+|-)\\/6 (\\d+h)?(\\d+):(\\d+)$")

const redBox = "🟥"
const yellowCircle = "🟡"
const blueSquare = "🟦"

type Counts = {red: number, yellow: number, blue: number}
type SutomResult = {isSuccess: boolean, nbTries: number|null, time: number, counts: Counts}

const parseSutomResult = (sutomResult: string) => {
  "\
  #SUTOM #779 1/6 00:07\
  🟥🟥🟥🟥🟥🟥🟥🟥\
  https://sutom.nocle.fr\
  "
  console.error(`Parsing the SUTOM result ${sutomResult}`)
  const multiline = sutomResult.split('\n')
  const parse = sutomResultFirstLine.exec(multiline[0])
  console.error(multiline)
  if (parse === null) {
    return null
  }
  const sutomIndex = parse[1];
  const nbTry = parse[2] === "-" ? null : parseInt(parse[2]);
  const isSuccess = nbTry !== null;
  const time = (parse[3] === undefined ? 0 : parseInt(parse[3]) * 3600) + parseInt(parse[4]) * 60 + parseInt(parse[5]);
  console.error(`Parsing the SUTOM ${sutomIndex}, done in ${nbTry} try, isSuccess=${isSuccess} and it was done in ${time} seconds`)
  const counts = {red: 0, yellow: 0, blue: 0}
  for (let i = 1; i < multiline.length; i++) {
    for (let j = 0; j < multiline[i].length; j+=2) {
      const unicode = multiline[i][j] + multiline[i][j+1]
      //console.error(`multiline[${i}][${j}] unicode = ${unicode}`)
      if (unicode === redBox) {
        counts.red++;
      } else if (unicode === yellowCircle) {
        counts.yellow++;
      } else if (unicode === blueSquare) {
        counts.blue++;
      }
    }
  }
  console.error(`There are ${counts.red} red boxes, ${counts.yellow} yellow circles and ${counts.blue} blue squares`)
  return {isSuccess, nbTries: nbTry, time, counts};

}


const computeScore = ({isSuccess, nbTries, time, counts}: SutomResult) => {
  if (!isSuccess || nbTries === null) {
    // You can't score a failed SUTOM
    return 0
  }
  if (nbTries === 1) {
    return 90+(10/Math.exp((time-1)/100))
  }
  // Need to handle the counts
  return 40-((nbTries-2)*10)+50/Math.exp((time-1)/1000) 
  }

export default function App() {
  const [sutomResult, setSutomResult] = useState("");
  const [score, setScore] = useState(0);

  const handleResult = (result: string) => {
    setSutomResult(result)
    const parseSutom = parseSutomResult(result)
    if (parseSutom === null) {
      console.error("The SUTOM result is not valid")
      return
    }
    const score = computeScore(parseSutom)
    setScore(score)
  }

  return (
    <div className="flex-container" style={{display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
    <ResultForm handleResult={handleResult}/>
    <Score score={score}/>
    <CopyScore score={score} sutomResult={sutomResult}/>
    </div>
  );
}
