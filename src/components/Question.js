import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Answer from '@components/Answer';
import useCorrectAnswer from '@hooks/CorrectAnswer';
import QuestionProvider, {
  QuestionContext,
} from '@components/QuestionProvider';

const GET_QUESTION_QUERY = gql`
  query($id: ID!) {
    oneQuestion(id: $id) {
      id
      question
      answers {
        id
        answer
        correct
      }
      answerCount
      quiz {
        id
        title
        user {
          name
          username
        }
      }
    }
  }
`;

export default function Question() {
  // ? TODO should questions be graded right away or grade all at the end?
  // -- the end for sure - and then give option to print or email pdf
  const isDocument = typeof document !== `undefined`;
  const router = useRouter();
  const { slug, qid } = router.query;
  const { loading, error, data } = useQuery(GET_QUESTION_QUERY, {
    variables: { id: qid },
  });
  const isAnswer = useCorrectAnswer({ questionId: qid });

  if (isDocument) {
    const activeQuiz = localStorage.getItem('activeQuiz');
    if (!activeQuiz || (activeQuiz && activeQuiz !== slug)) {
      router.push('/quiz/[slug]', `/quiz/${slug}`);
      return null;
    }
  }

  if (loading || !isAnswer) return null;
  if (error) return `Error! ${error}`;

  const { question, answers } = data.oneQuestion;
  let i = 0;

  return (
    <QuestionProvider qid={qid}>
      <QuestionContext.Consumer>
        {({ answer: { answerId } }) => (
          <>
            <h1>{question}</h1>
            <div className="answers" aria-busy={!!answerId}>
              {answers?.map(answer => {
                if (i >= answers.length) i = 0;
                i += 1;
                const letter = String.fromCharCode(97 + (i - 1)).toUpperCase();

                return (
                  <Answer
                    key={answer.answer}
                    questionId={qid}
                    isAnswer={isAnswer}
                    answer={answer}
                    letter={letter}
                  />
                );
              })}
            </div>
          </>
        )}
      </QuestionContext.Consumer>
    </QuestionProvider>
  );
}
