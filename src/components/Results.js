import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import QuestionStyles from '@styles/QuestionStyles';
import ResultsStyles from '@styles/ResultsStyles';
import { AppContext } from '@components/AppContext';
import formatPercent from '@lib/formatPercent';

export default function Results({ title, questions }) {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const { answeredQuestions, refetchAppData } = useContext(AppContext);

  useEffect(() => {
    refetchAppData();
  }, [refetchAppData]);

  const totalQuestions = questions.length;
  const grade = formatPercent(correctAnswers.length / totalQuestions);
  const goodGrade = correctAnswers.length / totalQuestions > 0.75;
  let questionNum = 0;
  let answerNum = 0;

  return (
    <ResultsStyles>
      <h1>{title}</h1>
      <p className="grade" data-good-grade={`${goodGrade}`}>
        You answered <span>{grade}</span> of the questions correctly
      </p>
      {questions.map(question => {
        questionNum += 1;
        return (
          <QuestionStyles key={question.id} className="results-question">
            <h2>
              <span>{questionNum})</span> <span>{question.question}</span>
            </h2>
            <div className="results-answers">
              {question.answers?.map(answer => {
                if (answerNum >= question.answers.length) answerNum = 0;
                answerNum += 1;

                const letter = String.fromCharCode(
                  97 + (answerNum - 1)
                ).toUpperCase();

                const [thisQuestion] = answeredQuestions.filter(
                  ({ id }) => id === question.id
                );

                const isCorrect = !!(
                  answer.correct && answer.id === thisQuestion.answerId
                );

                if (isCorrect && !correctAnswers.includes(answer.id)) {
                  setCorrectAnswers(prevState => [...prevState, answer.id]);
                }
                const correctAnswer = !isCorrect && answer.correct && answer.id;

                const thisAnswer =
                  thisQuestion &&
                  answer.id &&
                  thisQuestion.answerId &&
                  answer.id === thisQuestion.answerId;

                return (
                  <div
                    key={answer.id}
                    className="results-answer"
                    data-answered={`${!!thisAnswer}`}
                    data-is-correct={`${!!isCorrect}`}
                    data-correct-answer={`${!!correctAnswer}`}
                  >
                    <p className="results-answer--letter">{`${letter})`}</p>
                    <p className="results-answer--answer">{answer.answer}</p>
                  </div>
                );
              })}
            </div>
            {question.explanation && (
              <div className="question-explanation">
                <p className="question-explanation--light-blub">💡</p>
                <p className="question-explanation--explanation">
                  {question.explanation}
                </p>
              </div>
            )}
          </QuestionStyles>
        );
      })}
    </ResultsStyles>
  );
}

Results.propTypes = {
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
};
