import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_QUIZ_QUERY } from '@pages/quiz/[slug]';
import { AppContext } from '@components/AppContext';

function NavigatorAnswer({ slug, qid, question, currentQid }) {
  const { answeredQuestions } = useContext(AppContext);
  const answered = answeredQuestions.filter(
    ({ id: questionId }) => questionId === qid
  );

  const thisQuestion = qid === currentQid;

  return (
    <div
      key={qid}
      id={qid}
      className={`question--link ${thisQuestion ? `active` : ``}`}
    >
      <Link
        href="/quiz/[slug]/take-quiz/[qid]"
        as={`/quiz/${slug}/take-quiz/${qid}`}
      >
        <a className={`${answered.length ? 'answered' : ''}`}>
          <p className="question--text">{question}</p>
        </a>
      </Link>
    </div>
  );
}

NavigatorAnswer.propTypes = {
  slug: PropTypes.string.isRequired,
  qid: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  currentQid: PropTypes.string.isRequired,
};

export default function QuestionNavigator() {
  const router = useRouter();
  const { slug, qid } = router.query;
  const { loading, error, data } = useQuery(GET_QUIZ_QUERY, {
    variables: { slug },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const quiz = data.oneQuiz;

  return (
    <QuestionNavigatorStyles questions={quiz.questions.length}>
      <div className="navigator-wrapper">
        <h3>Questions</h3>
        <nav>
          {quiz.questions.map(({ id, question }) => (
            <NavigatorAnswer
              key={id}
              slug={slug}
              currentQid={qid}
              qid={id}
              question={question}
            />
          ))}
        </nav>
        <div className="turn-in-quiz">
          <button type="button">Turn In</button>
        </div>
      </div>
    </QuestionNavigatorStyles>
  );
}

const QuestionNavigatorStyles = styled.div`
  position: relative;

  .navigator-wrapper {
    background-color: var(--bg-color-alt);
    padding: 0;
    border-radius: var(--br);
    right: 0;
  }

  nav {
    max-height: calc(100vh - 42rem);
    /* min-height: 50rem; */
    overflow-y: auto;
  }

  h3,
  button {
    height: 8rem;
  }

  h3 {
    padding: 2rem 4rem;
    margin: 0;
    text-align: center;
    border-bottom: 3px solid var(--bg-color);
  }

  .question--link {
    display: flex;
    align-items: flex-start;
    padding: 0 2rem;

    a {
      display: block;
      padding: 2.5rem 2rem;
      transition: var(--transition-none);
      width: 100%;
    }

    &:not(:last-child) a {
      border-bottom: 1px solid var(--bg-color);
    }

    a:not(.answered):hover {
      color: var(--text-color-alt);
    }

    &:not(.active) a.answered p {
      opacity: 0.35;
    }

    &.active a {
      color: var(--text-color-alt);
      font-weight: 700;
      opacity: 1;
    }
  }

  a {
    display: grid;
    font-size: var(--fs-md);
    text-align: left;
    grid-template-columns: 1fr;
    justify-items: start;
    align-items: start;
  }

  p {
    margin: 0;
  }

  .turn-in-quiz {
    padding: 2rem 4rem;
    border-top: 3px solid var(--bg-color);
  }

  .turn-in-quiz button {
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
