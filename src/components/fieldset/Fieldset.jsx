import React from 'react';
import PropTypes from 'prop-types';
import styles from './Fieldset.module.scss';

const { fieldset, error } = styles;

const Fieldset = ({
   errorMessage, hasError, label, name, placeholder, register, type,
}) => {

   const labelKey = `${name}labelKey`;
   const inputKey = `${name}inputKey`;

   const labelField = (
      <label htmlFor={name} key={labelKey}>{label}</label>
   );

   const inputField = (
      <input
         id={name}
         className={hasError ? error : ''}
         key={inputKey}
         placeholder={placeholder}
         type={type}
         {...register}
      />
   );

   return (
      <fieldset className={fieldset}>
         {(type === 'checkBox') ? (
            [inputField, labelField]
         ) : (
            [labelField, inputField]
         )}
         {hasError && <span>{errorMessage}</span>}
      </fieldset>
   )
};

Fieldset.propTypes = {
   errorMessage: PropTypes.string,
   hasError: PropTypes.bool.isRequired,
   label: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   register: PropTypes.shape({

   }).isRequired,
   type: PropTypes.string.isRequired,
};

Fieldset.defaultProps = {
   errorMessage: '',
   placeholder: '',
};

export default Fieldset;
