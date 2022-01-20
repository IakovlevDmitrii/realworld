import React from 'react';
import PropTypes from "prop-types";
import styles from "../styles/authComponents.module.scss";

const FormField = ({ label, name, placeholder, type, register, validationRules, errors }) => {
   const getSubInput = (inputName) => (
      errors[inputName] && (
         <span>{errors[inputName].message}</span>
      )
   );

   return (
      <div className={styles.field}>
         <label htmlFor={name}>{label}</label>
         <input
            className={errors[name] && styles.error}
            placeholder={placeholder}
            type={type}
            {...register(name, {...validationRules})}
         />
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
};

export default FormField;
