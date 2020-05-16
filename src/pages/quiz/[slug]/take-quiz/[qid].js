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
      <div className="wrapper inner">
        <div>
          <h1>{activeQuizTitle || 'Loading...'}</h1>
          <div className="separator" />
          <Question slug={slug} qid={qid} />
        </div>
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
    /* background-color: var(--text-color);
    color: var(--bg-color); */
    font-size: var(--fs-3xl);
    margin: 0 0 2rem;
    width: 100%;
    /* padding: 1rem 2rem; */
  }

  .separator {
    width: 6rem;
    height: 0.75rem;
    margin: 1rem 0 5rem;
    background-color: var(--text-color);
  }

  .wrapper.inner {
    --columns: 1fr;
    display: grid;
    grid-gap: 4rem;
    grid-template-columns: var(--columns);
    padding: 6rem var(--gutter);
    position: relative;

    @media screen and (min-width: 990px) {
      --columns: 3fr 1.15fr;
    }
  }
`;
