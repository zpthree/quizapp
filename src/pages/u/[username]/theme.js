import React, { useState, useContext, useEffect } from 'react';
import { BlockPicker } from 'react-color';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import UserAccount from '@components/UserAccount';
import { UserAccountContext } from '@components/UserAccountProvider';

const UPDATE_THEME_MUTATION = gql`
  mutation($color: String!) {
    updateThemeColor(color: $color) {
      id
      themeColor
    }
  }
`;

function UserPage() {
  function UserAccountLayout() {
    const [color, setColor] = useState();
    const { user } = useContext(UserAccountContext);
    const [updateThemeColor] = useMutation(UPDATE_THEME_MUTATION, {
      errorPolicy: 'all',
    });

    useEffect(() => {
      setColor(JSON.parse(user?.themeColor));
    }, [user]);

    return (
      <ThemePageStyles>
        <h1>Set the primary color to be your favorite color!</h1>
        <p>
          For more helping picking the perfect color you can go to{' '}
          <a
            href="https://www.color-hex.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            color-hex.com
          </a>
          .
        </p>
        <BlockPicker
          color={color}
          onChangeComplete={newColor => setColor(newColor)}
        />
        <button
          type="button"
          className="btn btn__submit"
          onClick={() => {
            updateThemeColor({
              variables: { color: JSON.stringify(color) },
            });
          }}
        >
          Update
        </button>
      </ThemePageStyles>
    );
  }

  return (
    <UserAccount>
      <UserAccountLayout />
    </UserAccount>
  );
}

const ThemePageStyles = styled.div`
  a {
    color: var(--primary-color);
    text-decoration: underline;
  }

  .block-picker {
    border: 0.1rem solid var(--border-color);
    border-radius: var(--br) !important;
    box-shadow: none !important;
    max-width: 40rem;
    width: 100% !important;
  }

  .block-picker > div:first-child {
    display: none;
  }

  .block-picker > div:nth-child(2) {
    border-radius: 0 !important;
    height: 25rem !important;
  }

  .block-picker > div:last-child {
    background-color: var(--bg-color);
    border-radius: 0 !important;
  }

  .block-picker > div:last-child input {
    background-color: var(--bg-color);
    color: var(--text-color) !important;
    box-shadow: none !important;
    border: 0.1rem solid var(--border-color) !important;
  }

  .block-picker > div:nth-child(3) > div:first-child > span > div {
    height: 4rem !important;
    width: 4rem !important;
  }

  .block-picker > div:nth-child(3) > div:nth-child(2) > input {
    font-size: var(--fs-base) !important;
    height: auto !important;
    padding: 0.5rem !important;
  }

  button {
    margin-top: 2rem;
  }
`;

export default UserPage;
