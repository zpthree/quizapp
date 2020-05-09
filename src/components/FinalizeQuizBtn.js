import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { AppContext } from '@components/AppContext';

const FINALIZE_QUIZ_MUTATION = gql`
  mutation FINALIZE_QUIZ_MUTATION($slug: String!) {
    getQuizResults(slug: $slug) {
      message
    }
  }
`;

export default function FinalizeQuizBtn({ slug }) {
  const router = useRouter();
  const { refetchAppData } = useContext(AppContext);
  const [getQuizResults] = useMutation(FINALIZE_QUIZ_MUTATION, {
    errorPolicy: 'all',
  });
  return (
    <button
      className="get-results"
      data-answered="true"
      type="button"
      onClick={async () => {
        const isConfirmed = window.confirm(
          'Are you sure you want to turn in the current quiz?'
        );

        if (isConfirmed) {
          await getQuizResults({ variables: { slug } });
          await refetchAppData();
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
