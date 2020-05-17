import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';

export default function Form({ children, loading, error, onSubmit, btnText }) {
  return (
    <form method="post" onSubmit={onSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        {error && <Error error={error} />}
        {children}
        <button type="submit" className="btn btn__submit">
          {btnText}
        </button>
      </fieldset>
    </form>
  );
}

export function Field({ type, label, defaultValue, placeholder }) {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const newLabel =
    label
      .replace(/\s+/g, '')
      .charAt(0)
      .toLowerCase() + label.slice(1);

  return (
    <FieldStyles htmlFor={newLabel.replace(/\s+/g, '')}>
      <p>{label}</p>
      <input
        type={type}
        id={newLabel.replace(/\s+/g, '')}
        placeholder={placeholder}
        name={newLabel.replace(/\s+/g, '')}
        defaultValue={value}
        onChange={e => setValue(e.target.value)}
      />
    </FieldStyles>
  );
}

const FieldStyles = styled.label`
  p {
    font-weight: 600;
  }

  input {
    appearance: none;
    background-color: var(--bg-color);
    border-radius: var(--br);
    border: 0.1rem solid var(--border-color);
    color: var(--text-color);
  }

  input:focus {
    box-shadow: 0px 0px 6px 3px var(--primary-color-light);
  }
`;

Form.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  onSubmit: PropTypes.func,
  btnText: PropTypes.string,
};

Form.defaultProps = {
  btnText: 'Submit',
};

Field.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
};

Field.defaultProps = {
  defaultValue: '',
  placeholder: '',
};
