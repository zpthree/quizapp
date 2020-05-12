import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import withLayout from '@components/withLayout';
import UndrawExams from '@icons/UndrawExams';

function HomePage() {
  return (
    <HomePageStyles>
      <div className="hero">
        <div className="inner">
          <div className="intro">
            <h1>A place to grow 👨🏻‍🌾</h1>
            <p>
              The ultimate study guide. Make and/or take short quizzes to
              prepare for an uncoming exam. Get a grade at the end so you can
              see how much more studying you need to do.
            </p>
            <Link href="/quizzes">
              <a className="btn btn--submit">Take a quiz</a>
            </Link>
          </div>
          <UndrawExams />
        </div>
      </div>
    </HomePageStyles>
  );
}

const HomePageStyles = styled.div`
  --bg-color: var(--primary-color);
  .hero {
  }

  .hero .inner {
    padding: 4rem var(--gutter);
    display: grid;
    grid-template-columns: 3fr 4fr;
    grid-gap: 10rem;
    color: var(--white);
    min-height: calc(100vh - 16.4rem);
    align-items: center;

    .intro {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }

    p {
      line-height: 1.8;
    }

    .btn--submit {
      display: inline-block;
      border: 2px solid var(--white);
    }

    svg {
      width: 100%;
    }
  }
`;

export default withLayout(HomePage);
