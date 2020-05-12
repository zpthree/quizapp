import React from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const FINALIZE_QUIZ_MUTATION = gql`
  mutation FINALIZE_QUIZ_MUTATION($slug: String!) {
    getQuizResults(slug: $slug) {
      message
    }
  }
`;

export default function FinalizeQuizBtn({ slug }) {
  const router = useRouter();
  const [getQuizResults] = useMutation(FINALIZE_QUIZ_MUTATION, {
    errorPolicy: 'all',
  });
  return (
    <button
      className="btn btn--submit"
      type="button"
      onClick={async () => {
        const isConfirmed = window.confirm(
          'Are you sure you want to turn in the current quiz?'
        );

        if (isConfirmed) {
          await getQuizResults({ variables: { slug } });
          router.push('/quiz/[slug]/results', `/quiz/${slug}/results`);
        }
      }}
    >
      <div>Get Results</div>
    </button>
  );
}

FinalizeQuizBtn.propTypes = {
  slug: PropTypes.string.isRequired,
};
