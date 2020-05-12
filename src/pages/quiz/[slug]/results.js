import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import keyby from 'lodash.keyby';
import withLayout from '@components/withLayout';
import { AppContext } from '@components/AppContext';
import Results from '@components/Results';
import ResultsStyles from '@styles/ResultsStyles';

const QUIZ_QUERY = gql`
  query QUIZ_QUERY($slug: String!) {
    oneQuiz(slug: $slug) {
      title
      questions {
        id
        question
        answers {
          id
          answer
          correct
        }
        explanation
      }
    }
  }
`;

function ResultsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, error, data } = useQuery(QUIZ_QUERY, {
    variables: { slug },
  });
  const { theme, answeredQuestions, remainingQuestions } = useContext(
    AppContext
  );

  if (loading) return <ResultsStyles theme={theme} className="loading" />;
  if (error) return `Error! ${error}`;

  const quiz = data.oneQuiz;

  const isComplete = quiz.questions.every(question =>
    Object.keys(keyby(answeredQuestions, 'id')).includes(question.id)
  );

  if (!isComplete) {
    if (remainingQuestions.length) {
      return router.push(`/quiz/${slug}/take-quiz/${remainingQuestions[0].id}`);
    }

    return router.push(`/quiz/${slug}`);
  }

  return <Results {...quiz} />;
}

export default withLayout(ResultsPage);
