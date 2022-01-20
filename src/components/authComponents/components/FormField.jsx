import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import styles from "../styles/authComponents.module.scss";

const FormField = ( {
   label,
   name,
   placeholder,
   type,
   register,
   validationRules,
   errors,
   labelBehind,
   extraClassName,
} ) => {
   const getSubInput = (inputName) => (
      errors[inputName] && (
         <span>{errors[inputName].message}</span>
      )
   );

   const elements = {
      label: <label htmlFor={name}>{label}</label>,
      input: <input
         className={errors[name] && styles.error}
         placeholder={placeholder}
         type={type}
         {...register(name, {...validationRules})}
      />,
   };

   const elementsToShow = () => (
      labelBehind ? (
         <>
            {elements.input}
            {elements.label}
         </>
         ) : (
         <>
            {elements.label}
            {elements.input}
         </>
      )
   );

   return (
      <div className={classNames(styles.field, extraClassName)}>
         {elementsToShow()}
         {getSubInput(name)}
      </div>
   )
};

FormField.propTypes = {
   label: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   placeholder: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   register: PropTypes.func.isRequired,
   validationRules: PropTypes.shape({ }).isRequired,
   errors: PropTypes.shape({ }).isRequired,
   labelBehind: PropTypes.bool,
   extraClassName: PropTypes.string,
};

FormField.defaultProps = {
   labelBehind: false,
   extraClassName: '',
};

export default FormField;
