import React, { Fragment, useState } from "react";

const outcomes = [0, 1, 2, 3, 4, 5, 6, "WB", "NB", "W"] as const;
type outcome = (typeof outcomes)[number];

function Scoreboard() {
  // store scores
  const [scores, setScores] = useState<outcome[][]>([[]]);
  const [total, setTotal] = useState(0);
  const [remainingBalls, setRemainingBalls] = useState(6);
  const [wickets, setWickets] = useState(0);

  function getOvers() {
    if (scores.length === 0) return "0.0";
    return (
      scores.length -
      1 +
      scores[scores.length - 1]?.length * 0.1
    ).toFixed(1);
  }

  function addEntry(outcome: outcome) {
    if (remainingBalls === 0) return;
    const lastOver = scores[scores.length - 1];
    setScores((scores) => [...scores.slice(0, -1), [...lastOver, outcome]]);
  }

  function handleOutcome(outcome: outcome) {
    addEntry(outcome);

    if (outcome === "W") {
      setRemainingBalls((remainingBalls) => remainingBalls - 1);
      setWickets((wickets) => wickets + 1);
    } else if (outcome === "NB") {
      setTotal((total) => total + 1);
    } else if (outcome === "WB") {
      setTotal((total) => total + 1);
    } else {
      setRemainingBalls((remainingBalls) => remainingBalls - 1);
      setTotal((total) => total + outcome);
    }
  }

  function addOver() {
    setScores((scores) => [...scores, []]);
    setRemainingBalls(6);
  }

  return (
    <div className="min-h-screen grid items-center p-3">
      <div className="h-fit min-w-[400px] w-[75vw] mx-auto p-3 bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-100 border-opacity-10">
        <div className="flex gap-5 mb-10 flex-wrap justify-center">
          <h1 className="text-7xl font-bold text-white p-4 rounded-md  bg-slate-950">
            {total} - {wickets}
          </h1>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Current Over: {getOvers()}</p>
            <p>Remaining balls this over: {remainingBalls}</p>
            {scores.length > 0 && (
              <OverDisplay over={scores[scores.length - 1]} num="curr" />
            )}
          </div>
        </div>
        <div className="flex gap-2 justify-center flex-wrap">
          {outcomes.map((outcome) => (
            <Button
              key={outcome}
              onClick={() => handleOutcome(outcome)}
              disabled={remainingBalls === 0}
            >
              {outcome}
            </Button>
          ))}
          <Button
            onClick={addOver}
            disabled={remainingBalls !== 0}
            className="bg-blue-800 w-fit"
          >
            Add Over
          </Button>
        </div>
        {scores.length > 1 && (
          <div className="p-2 rounded-md bg-slate-800 mt-10 w-fit mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">
              Previous Overs
            </h2>
            <div className="space-y-3">
              {scores
                .slice(0, -1)
                .reverse()
                .map((over, i) => (
                  <Fragment key={`display-${i}`}>
                    <div className="flex gap-10 items-center">
                      <p className="rounded-full bg-orange-200 aspect-square w-8 grid place-items-center">
                        {(scores.length - i - 1).toString().padStart(2, "0")}
                      </p>
                      <OverDisplay over={over} key={i} num={i} />
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        "rounded-md p-2 bg-slate-800 text-white min-w-[2em] h-10 disabled:opacity-90 disabled:cursor-not-allowed" +
        (className ? " " + className : "")
      }
      {...props}
    ></button>
  );
}

function OverDisplay({ over, num }: { over: outcome[]; num: number | string }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {over.map((outcome, i) => (
        <p
          className="rounded-md bg-green-400 font-bold w-9 py-2 aspext-square grid place-items-center"
          key={`s-${num}-${i}`}
        >
          {outcome}
        </p>
      ))}
    </div>
  );
}

export default Scoreboard;
