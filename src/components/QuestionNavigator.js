import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_QUIZ_QUERY } from '@pages/quiz/[slug]';
import { AppContext } from '@components/AppContext';

function NavigatorAnswer({ questionNumber, slug, qid, question, currentQid }) {
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
          <p className="question--number">{`${questionNumber})`}</p>
          <p className="question--text">{question}</p>
        </a>
      </Link>
    </div>
  );
}

NavigatorAnswer.propTypes = {
  questionNumber: PropTypes.number.isRequired,
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
  let i = 0;

  return (
    <QuestionNavigatorStyles questions={quiz.questions.length}>
      <div className="navigator-wrapper">
        <h3>Questions</h3>
        <nav>
          {quiz.questions.map(({ id, question }) => {
            i += 1;

            return (
              <NavigatorAnswer
                questionNumber={i}
                key={id}
                slug={slug}
                currentQid={qid}
                qid={id}
                question={question}
              />
            );
          })}
        </nav>
      </div>
    </QuestionNavigatorStyles>
  );
}

const QuestionNavigatorStyles = styled.div`
  position: relative;

  .navigator-wrapper {
    background-color: var(--bg-color-alt);
    border-radius: var(--br);
    padding: 0;
    right: 0;
  }

  nav {
    max-height: calc(100vh - 34rem);
    overflow-y: auto;
  }

  h3,
  button {
    height: 8rem;
  }

  h3 {
    border-bottom: 0.3rem solid var(--bg-color);
    margin: 0;
    padding: 2rem 4rem;
    text-align: center;
  }

  .question--link {
    padding: 0 2rem;

    a {
      display: grid;
      grid-template-columns: 3.5rem auto;
      padding: 2.5rem 1rem;
      text-align: left;
      transition: var(--transition-none);
    }

    &:not(:last-child) a {
      border-bottom: 0.1rem solid var(--bg-color);
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

  p {
    margin: 0;
  }
`;
