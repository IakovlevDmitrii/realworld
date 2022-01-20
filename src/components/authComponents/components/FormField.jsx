import React from 'react';
import PropTypes from "prop-types";
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
      <div className={styles.field}>
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
};

FormField.defaultProps = {
   labelBehind: false,
};

export default FormField;
