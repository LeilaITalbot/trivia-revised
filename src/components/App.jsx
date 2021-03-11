import React, { Component, useState } from "react";
import "../css/App.css";
import data from "../sample_data.json";

function Answer(props) {
  return <p onClick={props.onClick}>{props.text}</p>;
}

function NextQuestion(props) {
  return <button onClick={props.onClick}>Next Question</button>;
}

function Question(props) {
  return (
    <div>
      <h1>{props.text}</h1>
      {props.choices.map((choice) => {
        return (
          <Answer onClick={() => {props.onClick(choice)}} text={choice} key={choice} />
        );
      })}
    </div>
  );
}

function App() {
  let [questionIndex, setQuestionIndex] = useState(0);
  let questionData = data[questionIndex];

  let questionChoices = questionData.question.choices;
  let correctChoiceIndex = questionData.question.correct_choice_index;
  let question = questionData.question.text;

  let [isAnswered, setIsAnswered] = useState("Answer goes here");

  function onClickNextQuestion() {
    // Question will loop back to beginning when there are no more questions
    if (questionIndex < data.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuestionIndex(0);
    }
    setIsAnswered("Answer goes here");
  }
  if (isAnswered !== "Answer goes here") {
    let answer = isAnswered;
    let correctAnswer = questionChoices[correctChoiceIndex];
    if (isAnswered === correctAnswer) {
      setIsAnswered("Correct! The answer is " + {answer} + "!");
    } else {
      setIsAnswered("Sorry, "+ {answer} +" is incorrect. The correct answer is " + {correctAnswer} + "!");
    }
  }
  return (
    <div>
      <h1>Trivia!</h1>
      <Question
        text={question}
        choices={questionChoices}
        onClick={(choice) => {
          setIsAnswered(choice)
        }}
      />
      <p>{isAnswered}</p>
      <NextQuestion onClick={() => {onClickNextQuestion()}} />
    </div>
  );
}

export default App;
