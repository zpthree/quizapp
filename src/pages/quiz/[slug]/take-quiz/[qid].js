import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Answer from '@components/Answer';
import withLayout from '@components/withLayout';
import useCorrectAnswer from '@hooks/CorrectAnswer';

const GET_QUESTION_QUERY = gql`
  query($id: ID!) {
    oneQuestion(id: $id) {
      id
      question
      answers {
        id
        answer
        correct
      }
      answerCount
      quiz {
        id
        title
        user {
          name
          username
        }
      }
    }
  }
`;

function Question() {
  const router = useRouter();
  const { qid } = router.query;
  const { loading, error, data } = useQuery(GET_QUESTION_QUERY, {
    variables: { id: qid },
  });
  const isAnswer = useCorrectAnswer({ questionId: qid });

  if (loading || !isAnswer) return null;
  if (error) return `Error! ${error}`;

  const question = data.oneQuestion;
  let letter = 0;

  return (
    <QuestionStyles>
      <h1>{question.question}</h1>
      <div className="answers">
        {question.answers?.map(answer => {
          letter += 1;
          return (
            <Answer
              key={answer.id}
              questionId={qid}
              isAnswer={isAnswer}
              answer={answer}
              letter={letter}
            />
          );
        })}
      </div>
    </QuestionStyles>
  );
}

const QuestionStyles = styled.div`
  padding: 0 var(--gutter);

  h1 {
    font-size: var(--fs-xl);
  }

  .answers {
    width: 100%;
    display: grid;
    grid-template-columns: 1;
    grid-gap: 20px;
  }
`;

export default withLayout(Question);
