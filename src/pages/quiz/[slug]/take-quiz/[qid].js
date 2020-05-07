import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import withLayout from '@components/withLayout';
import Question from '@components/Question';
import QuestionNavigator from '@components/QuestionNavigator';
import QuestionProvider, {
  QuestionContext,
} from '@components/QuestionProvider';

function QuestionPage() {
  const router = useRouter();
  const { slug, qid } = router.query;

  return (
    <QuestionProvider qid={qid}>
      <QuestionPageWrapper>
        <QuestionContext.Consumer>
          {data => (
            <div className="quiz-title">
              <div className="inner">
                <h1>{data.quizTitle}</h1>
              </div>
            </div>
          )}
        </QuestionContext.Consumer>
        <div className="wrapper inner">
          <Question slug={slug} qid={qid} />
          <QuestionNavigator />
        </div>
      </QuestionPageWrapper>
    </QuestionProvider>
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
