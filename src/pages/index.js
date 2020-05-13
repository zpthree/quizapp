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
              The ultimate study tool. Make and/or take short quizzes to prepare
              for an uncoming exam. Get a grade at the end so you can see how
              much more studying you need to do.
            </p>
            <Link href="/quizzes">
              <a aria-label="See a list of quizzes" className="btn btn--submit">
                Take a quiz
              </a>
            </Link>
          </div>
          <UndrawExams />
        </div>
      </div>
    </HomePageStyles>
  );
}

const HomePageStyles = styled.div`
  --columns: 1;
  .hero .inner {
    align-items: center;
    color: var(--white);
    display: grid;
    grid-gap: 10rem;
    grid-template-columns: var(--columns);
    min-height: calc(100vh - 16.4rem);
    padding: 4rem var(--gutter);

    @media screen and (min-width: 990px) {
      --columns: 3fr 4fr;
    }

    .intro {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: center;
      order: 1;

      @media screen and (min-width: 990px) {
        order: 0;
      }
    }

    p {
      line-height: 1.8;
    }

    .btn--submit {
      border: 0.2rem solid var(--white);
      display: inline-block;
    }

    svg {
      order: 0;
      width: 100%;

      @media screen and (min-width: 990px) {
        order: 1;
      }
    }
  }
`;

export default withLayout(HomePage);
