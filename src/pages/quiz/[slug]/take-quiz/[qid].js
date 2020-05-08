import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import withLayout from '@components/withLayout';
import Question from '@components/Question';
import QuestionNavigator from '@components/QuestionNavigator';
import { AppContext } from '@components/AppContext';

function QuestionPage() {
  const isDocument = typeof document !== `undefined`;
  const router = useRouter();
  const { slug, qid } = router.query;
  const { activeQuizTitle } = useContext(AppContext);

  useEffect(() => {
    if (isDocument) {
      setTimeout(() => {
        const el = document.getElementById(qid);
        el.scrollIntoView();
      }, 0);
    }
  }, [isDocument, qid]);

  return (
    <QuestionPageWrapper>
      <div className="quiz-title">
        <div className="inner">
          <h1>{activeQuizTitle || 'Loading...'}</h1>
        </div>
      </div>
      <div className="wrapper inner">
        <Question slug={slug} qid={qid} />
        <QuestionNavigator />
      </div>
    </QuestionPageWrapper>
  );
}

export default withLayout(QuestionPage);

export const QuestionPageWrapper = styled.div`
  .quiz-title {
    background-color: var(--primary-color);
    color: var(--white);
  }

  .quiz-title .inner {
    padding: 2rem var(--gutter);
  }

  h1 {
    font-size: var(--fs-2xl);
    width: 100%;
    margin: 0;
  }

  .wrapper.inner {
    display: grid;
    grid-template-columns: 3fr 1.15fr;
    grid-gap: 4rem;
    padding: 4rem var(--gutter);
    position: relative;
  }
`;
