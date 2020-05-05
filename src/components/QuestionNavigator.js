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
      <div className="navigator-wrapper">
        <h3>Questions</h3>
        <nav>
          {quiz.questions.map(({ id, question }) => {
            i += 1;
            const isAnswered = localStorage.getItem(id);

            return (
              <div key={id} className="question--link">
                <Link
                  href="/quiz/[slug]/take-quiz/[qid]"
                  as={`/quiz/${slug}/take-quiz/${id}`}
                >
                  <a
                    data-question-number={i}
                    className={`${id === qid ? 'active' : 'inactive'} ${
                      isAnswered ? 'answered' : ''
                    }`}
                  >
                    <p className="question--number">{i})</p>
                    <p className="question--text">{question}</p>
                  </a>
                </Link>
              </div>
            );
          })}
        </nav>
        <button className="turn-in-quiz" type="button">
          Turn In
        </button>
      </div>
    </QuestionNavigatorStyles>
  );
}

const QuestionNavigatorStyles = styled.div`
  position: relative;

  .navigator-wrapper {
    background-color: var(--bg-color-alt);
    padding: 2rem 2rem 0;
    border-radius: var(--br);
    max-height: calc(100vh - 25rem);
    min-height: 65rem;
    overflow-y: auto;
    /* position: fixed; */
    right: 0;
  }

  h3 {
    padding: 0;
    margin: 0;
    text-align: center;
  }

  .question--link {
    display: flex;
    align-items: flex-start;
    padding: 4rem 1rem;

    &:not(:last-child) {
      border-bottom: 1px solid var(--bg-color);
    }

    a:not(.answered):hover {
      color: var(--text-color-alt);
    }

    a.answered {
      cursor: default;
      opacity: 0.35;
    }
  }

  a {
    display: grid;
    font-size: var(--fs-md);
    text-align: left;
    grid-template-columns: 20px 1fr;
    justify-items: start;
    align-items: start;
  }

  p {
    margin: 0;
  }

  .turn-in-quiz {
    --background-color: var(--primary-color);
    background-color: var(--background-color);
    border-radius: var(--br);
    border: none;
    color: var(--white);
    cursor: pointer;
    font-size: var(--fs-base);
    height: 4rem;
    outline: none;
    width: 100%;
    margin-bottom: 2rem;
    transition: var(--transition-none);

    &:hover {
      --background-color: var(--primary-color-dark);
    }

    &:focus {
      --background-color: var(--primary-color-light);
      transform: scale(0.98);
    }
  }
`;
