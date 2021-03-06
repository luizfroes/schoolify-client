import { useState } from "react";
import { useGame } from "../../context/GameProvider";
import { Logo } from "../Logo";
import { ProgressBar } from "./ProgressBar";
import { Question } from "./Question";
import { Results } from "./Results";

export const Quiz = () => {
  const {
    state: { questions, percentComplete, results, score },
    dispatch,
  } = useGame();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [optionSelected, setOptionSelected] = useState();
  const [displayQuestion, setDisplayQuestion] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];

  const onClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOptionSelected(false);
    } else {
      setDisplayQuestion(false);
    }
    dispatch({
      type: "NEXT_QUESTION",
      payload: {
        currentQuestionIndex,
        userAnswer: optionSelected,
      },
    });
  };

  const onChange = (event) => {
    setOptionSelected(event.target.value);
  };

  return (
    <div>
      <Logo />
      <ProgressBar value={percentComplete} isComplete={displayQuestion} />
      {displayQuestion && (
        <Question
          currentQuestion={currentQuestion}
          onChange={onChange}
          optionSelected={optionSelected}
          onClick={onClick}
        />
      )}
      {!displayQuestion && <Results results={results} score={score} />}
    </div>
  );
};
