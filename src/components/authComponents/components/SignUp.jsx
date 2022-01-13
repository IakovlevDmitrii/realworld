import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from 'classnames';

import realWorldApiService from '../../../service';
import actionCreators from '../../../store/action-creators';

import Spinner from "../../spinner";

import styles from '../styles/authComponents.module.scss';

const SignUp = ({ updateUser }) => {
   const [ isLoading, setIsLoading ] = useState(false);
   const [ hasErrors, setHasError ] = useState({});

   useEffect(() => (
      () => {setHasError({})}
   ), []);

   const {
      register,
      handleSubmit,
      getValues,
      formState: {
         errors
      }
   } = useForm({
      criteriaMode: "firstError"
   });

   const onSubmit = ({ username, email, password }) => {
      setIsLoading(true);

      realWorldApiService
         .authentication
         .register(username, email, password)
         .then((res) => {
            if(res.user) {updateUser(res.user)}
            if(res.errors) {setHasError(res.errors)}

            setIsLoading(false);
         })
         .catch(err => {
            setIsLoading(false);

            throw new Error(err.message);
         });
   };

   if(isLoading) { return <Spinner /> }

   return (
      <section className={styles.section}>
         <div className={styles.containerNarrow}>
            <div className={styles.content}>
               <div className={styles.title}>
                  <h3>Create new account</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.field}>
                     <label htmlFor='username'>Username</label>
                     <input
                        className={
                           (errors.username || hasErrors.username) ? styles.error : ''}
                        placeholder='Username'
                        type='text'
                        {...register('username', {
                           required: 'Username is required',
                           minLength: {
                              value: 3,
                              message: 'Username must be at least 3 characters'
                           },
                           maxLength: {
                              value: 20,
                              message: 'Username must not exceed 20 characters'
                           },
                        })}
                     />
                     {errors.username && <span>{errors.username.message}</span>}
                     {hasErrors.username && (
                        <span>Username {hasErrors.username[0]}</span>)}
                  </div>
                  <div className={styles.field}>
                     <label htmlFor='email'>Email address</label>
                     <input
                        className={( errors.email || hasErrors.email) ? styles.error : ''}
                        placeholder='Email address'
                        type='email'
                        {...register("email", {
                           required: 'Email is required',
                           // react-hook-form examples
                           // pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                           pattern: {
                              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              message: "Invalid email address"
                           }
                        })}
                     />
                     {errors.email && <span>{errors.email.message}</span>}
                     {hasErrors.email && <span>Email {hasErrors.email[0]}</span>}
                  </div>
                  <div className={styles.field}>
                     <label htmlFor='password'>Password</label>
                     <input
                        className={errors.password ? styles.error : ''}
                        placeholder='Password'
                        type='password'
                        {...register('password', {
                           required: 'Password is required',
                           minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters'
                           },
                           maxLength: {
                              value: 40,
                              message: 'Password must not exceed 40 characters'
                           },
                        })}
                     />
                     {errors.password && <span>{errors.password.message}</span>}
                  </div>
                  <div className={styles.field}>
                     <label htmlFor='passwordConfirmation'>Repeat Password</label>
                     <input
                        className={errors.passwordConfirmation ? styles.error : ''}
                        placeholder='Password'
                        type='password'
                        {...register('passwordConfirmation', {
                           required: 'Repeat Password is required',
                           validate: {
                              match: (value) => {
                                 const { password } = getValues();
                                 return password === value || "Password does not match";
                              }
                           },
                        })}
                     />
                     {errors.passwordConfirmation && (
                        <span>
                           {errors.passwordConfirmation.message}
                        </span>
                     )}
                  </div>
                  <div className={classNames(styles.field, styles.agreement)}>
                     <input
                        id='agreement'
                        className={errors.agreement ? styles.error : ''}
                        type='checkBox'
                        {...register('agreement', {
                           required: 'Agreement is required',
                        })}
                     />
                     <label htmlFor='agreement'>
                        I agree to the processing of my personal information
                     </label>
                     {errors.agreement && <span>{errors.agreement.message}</span>}
                  </div>
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
