import React, {
  useEffect,
  useState,
} from "react";

import questionBank from "./questions";

function shuffle(array) {
  const copy = [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [copy[i], copy[j]] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}

function Exam({
  contestant,
  onExamFinish,
}) {
  const [questions, setQuestions] =
    useState([]);

  const [answers, setAnswers] =
    useState({});

  const [timeLeft, setTimeLeft] =
    useState(30 * 60);

  const [submitted, setSubmitted] =
    useState(false);

  useEffect(() => {
    const shuffledQuestions =
      shuffle(questionBank);

    const preparedQuestions =
      shuffledQuestions.map(
        (question) => ({
          ...question,

          options: shuffle(
            question.options
          ),
        })
      );

    setQuestions(
      preparedQuestions
    );
  }, []);

  useEffect(() => {
    if (submitted) {
      return;
    }

    if (timeLeft <= 0) {
      submitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(
        (previous) =>
          previous - 1
      );
    }, 1000);

    return () =>
      clearInterval(timer);
  }, [
    timeLeft,
    submitted,
  ]);

  function selectAnswer(
    questionId,
    option
  ) {
    setAnswers(
      (previous) => ({
        ...previous,

        [questionId]: option,
      })
    );
  }

  function formatTime(seconds) {
    const minutes =
      Math.floor(
        seconds / 60
      );

    const secondsRemaining =
      seconds % 60;

    return (
      String(minutes).padStart(
        2,
        "0"
      ) +
      ":" +
      String(
        secondsRemaining
      ).padStart(2, "0")
    );
  }

  function submitExam() {
    if (submitted) {
      return;
    }

    setSubmitted(true);

    let score = 0;

    questions.forEach(
      (question) => {
        const selectedAnswer =
          answers[question.id];

        /*
          AI-style answer checking.

          The stored answer key is compared
          with the selected answer.
        */

        if (
          selectedAnswer ===
          question.answer
        ) {
          score++;
        }
      }
    );

    const percentage =
      (
        (score /
          questions.length) *
        100
      ).toFixed(2);

    const result = {
      otr: contestant.otr,
      name: contestant.name,
      dob: contestant.dob,
      gender: contestant.gender,
      email: contestant.email,
      mobile: contestant.mobile,
      qualification:
        contestant.qualification,
      address: contestant.address,

      score: score,

      total: questions.length,

      percentage:
        percentage,

      date:
        new Date().toLocaleString(),
    };

    saveResult(result);

    onExamFinish(result);
  }

  function saveResult(result) {
    const oldResults =
      JSON.parse(
        localStorage.getItem(
          "tnpscResults"
        )
      ) || [];

    const resultMap =
      new Map();

    oldResults.forEach(
      (item) => {
        resultMap.set(
          item.otr,
          item
        );
      }
    );

    resultMap.set(
      result.otr,
      result
    );

    localStorage.setItem(
      "tnpscResults",
      JSON.stringify(
        Array.from(
          resultMap.values()
        )
      )
    );
  }

  if (questions.length === 0) {
    return (
      <div className="page">
        <div className="loading-card">
          <h2>
            Preparing 25 Questions...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-page">
      <div className="exam-top">
        <div>
          <h1>
            TNPSC Group 4
          </h1>

          <p>
            Candidate:{" "}
            <b>
              {contestant.name}
            </b>
          </p>

          <p>
            OTR:{" "}
            <b>
              {contestant.otr}
            </b>
          </p>
        </div>

        <div className="timer">
          {formatTime(
            timeLeft
          )}
        </div>
      </div>

      <div className="question-list">
        {questions.map(
          (
            question,
            index
          ) => (
            <div
              className="question-card"
              key={
                question.id
              }
            >
              <h3>
                {index + 1}.{" "}
                {
                  question.question
                }
              </h3>

              <div>
                {question.options.map(
                  (option) => (
                    <label
                      className="option"
                      key={option}
                    >
                      <input
                        type="radio"
                        name={
                          "question-" +
                          question.id
                        }
                        checked={
                          answers[
                            question.id
                          ] === option
                        }
                        onChange={() =>
                          selectAnswer(
                            question.id,
                            option
                          )
                        }
                      />

                      <span>
                        {option}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>

      <button
        className="submit-exam"
        onClick={
          submitExam
        }
      >
        Submit Examination
      </button>
    </div>
  );
}

export default Exam;