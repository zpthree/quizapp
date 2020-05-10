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
  const { finalized, activeQuizTitle } = useContext(AppContext);

  useEffect(() => {
    if (isDocument) {
      setTimeout(() => {
        // set the scroll position of the side bar navigation
        const overflow = document.querySelector('.navigator-wrapper nav');

        if (overflow && qid) {
          const anchor = document.getElementById(qid);
          // Get the bounding client rectangles for both
          // the overflow container and the target anchor
          const rectOverflow = overflow.getBoundingClientRect();
          const rectAnchor = anchor.getBoundingClientRect();

          // Set the scroll position of the overflow container
          overflow.scrollTop = rectAnchor.top - rectOverflow.top;
        }
      }, 0);
    }
  }, [isDocument, qid]);

  if (isDocument && finalized) {
    return router.push(`/quiz/${slug}/results`);
  }

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
