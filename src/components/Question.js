import React from 'react';
import PropTypes from 'prop-types';
import Answer from '@components/Answer';
import QuestionProvider, {
  QuestionContext,
} from '@components/QuestionProvider';

export default function Question(props) {
  // ? TODO should questions be graded right away or grade all at the end?
  // -- the end for sure - and then give option to print or email pdf

  const {
    question: { answers, question: questionString, ...question },
  } = props;
  console.log(question);
  let i = 0;

  return (
    <QuestionProvider qid={question.id}>
      <QuestionContext.Consumer>
        {({ answer: { answerId } }) => (
          <div className="question">
            <h2>{questionString}</h2>
            <div className="answers">
              {answers?.map(answer => {
                if (i >= answers.length) i = 0;
                i += 1;
                const letter = String.fromCharCode(97 + (i - 1)).toUpperCase();

                return (
                  <Answer
                    key={answer.answer}
                    questionId={question.id}
                    answer={answer}
                    letter={letter}
                  />
                );
              })}
            </div>
          </div>
        )}
      </QuestionContext.Consumer>
    </QuestionProvider>
  );
}

Question.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.array.isRequired,
    quiz: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    question: PropTypes.string.isRequired,
  }),
};
