import React, { useState } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import realWorldApiService from '../../../service';
import actionCreators from '../../../store/action-creators';

import Spinner from "../../spinner";
import FormField from './FormField';
import formsConfig from './formsConfig';

import styles from '../styles/authComponents.module.scss';

const SignUp = ({ updateUser }) => {
   const [ isLoading, setIsLoading ] = useState(false);
   const {register, handleSubmit, getValues, formState: {errors}, setError} = useForm({});

   const onSubmit = ({ username, email, password }) => {
      setIsLoading(true);

      realWorldApiService
         .authentication
         .register(username, email, password)
         .then((res) => {
            const userDetails = res.user;
            const serverErrors = res.errors;

            if(userDetails) {
               updateUser(userDetails)
            }

            if(serverErrors) {
               for(const error in serverErrors) {
                  if(Object.prototype.hasOwnProperty.call(serverErrors, error)){
                     setError(error, {
                        type: "manual",
                        message: `${error} ${serverErrors[error][0]}`,
                     });
                  }
               }
            }
         })
         .catch((err) => {
            throw new Error(err.message);
         })
         .finally(() => {
            setIsLoading(false);
         })
   };

   const validationRules = {
      username: {
         required: 'Username is required',
         minLength: {
            value: 3,
            message: 'Username must be at least 3 characters',
         },
         maxLength: {
            value: 20,
            message: 'Username must not exceed 20 characters',
         },
      },

      email: {
         required: 'Email is required',
         // react-hook-form examples
         // pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         pattern: {
            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'Invalid email address',
         },
      },

      password: {
         required: 'Password is required',
         minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
         },
         maxLength: {
            value: 40,
            message: 'Password must not exceed 40 characters',
         },
      },

      passwordConfirmation: {
         required: 'Repeat Password is required',
         validate: {
            match: (value) => {
               const { password } = getValues();
               return password === value || "Password does not match";
            }
         },
      },

      agreement: {
         required: 'Agreement is required',
      },
   };

   const formFields = (formsConfig.singUp).map((fieldDetails) => {
      const { name } = fieldDetails;
      const addedFieldDetails = fieldDetails;

      if(name === 'agreement') {
         addedFieldDetails.extraClassName = styles.agreement
      }

      return (
         <FormField
            {...addedFieldDetails}
            register={register}
            validationRules={validationRules[name]}
            errors={errors}
            key={name}
         />
      )
   });

   if(isLoading) {
      return <Spinner />
   }

   return (
      <section className={styles.section}>
         <div className={styles.container}>
            <div className={styles.content}>
               <div className={styles.title}>
                  <h3>Create new account</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  {formFields}
                  <button
                     className={styles.formButton}
                     type='submit'>Create</button>
               </form>
               <div className={styles.authLink}>
                  <div>Already have an account?</div>
                  <div className={styles.link}>
                     <Link to='/sign-in'>Sign In.</Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

SignUp.propTypes = {
   updateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
   updateUser: actionCreators.authentication.updateUser,
};

export default connect(
   null,
   mapDispatchToProps
)(SignUp);
