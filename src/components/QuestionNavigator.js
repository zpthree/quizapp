import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_QUIZ_QUERY } from '@pages/quiz/[slug]';

export default function QuestionNavigator() {
  const router = useRouter();
  const { slug, qid } = router.query;
  const { loading, error, data } = useQuery(GET_QUIZ_QUERY, {
    variables: { slug },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const quiz = data.oneQuiz;
  let i = 0;

  return (
    <QuestionNavigatorStyles questions={quiz.questions.length}>
      {quiz.questions.map(({ id }) => {
        i += 1;

        return (
          <Link
            key={id}
            href="/quiz/[slug]/take-quiz/[qid]"
            as={`/quiz/${slug}/take-quiz/${id}`}
          >
            <a
              data-question-number={i}
              className={`${id === qid ? 'active' : 'inactive'}`}
            >
              {i}
            </a>
          </Link>
        );
      })}
    </QuestionNavigatorStyles>
  );
}

const QuestionNavigatorStyles = styled.nav`
  display: grid;
  grid-template-columns: repeat(${({ questions }) => questions}, 1fr);

  .question-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    align-items: center;
    background-color: var(--border-color);
    border: 2px solid var(--bg-color);
    display: flex;
    font-size: var(--fs-sm);
    justify-content: center;
    padding: 1rem;
    width: 100%;

    &.active {
      background-color: rgba(255, 0, 0, 0.65);
    }
  }
`;
