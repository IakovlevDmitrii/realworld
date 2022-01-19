import React, { useState } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import realWorldApiService from '../../../service';
import actionCreators from '../../../store/action-creators';

import Spinner from "../../spinner";

import styles from '../styles/authComponents.module.scss';

const SignIn = ({ updateUser }) => {
   const [ isLoading, setIsLoading ] = useState(false);
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors }
   } = useForm();

   const onSubmit = (data) => {
      const { email, password } = data;

      setIsLoading(true);

      realWorldApiService
         .authentication
         .login(email, password)
         .then((res) => {
            if(res.user) {updateUser(res.user)}
            if(res.errors) {
               setError("email", {
                  type: "manual",
                  message: `Email or password ${res.errors['email or password'][0]}`,
               });
               setError("password", {
                  type: "manual",
                  message: `Email or password ${res.errors['email or password'][0]}`,
               });
            }

            setIsLoading(false);
         })
         .catch(err => {
            setIsLoading(false);

            throw new Error(err.message)
         });
   };

   const getSubInput = (inputName) => (
      errors[inputName] && (
         <span>{errors[inputName].message}</span>
      )
   );

   if(isLoading) { return <Spinner /> }

   return (
      <section className={styles.section}>
         <div className={styles.container}>
            <div className={styles.content}>
               <div className={styles.title}>
                  <h3>Sign In</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.field}>
                     <label htmlFor='email'>Email address</label>
                     <input
                        className={errors.email && styles.error}
                        placeholder="Email address"
                        type='email'
                        {...register("email", {
                           required: 'Email is required',
                           pattern: {
                              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              message: "Invalid email address"
                           }
                        })}
                     />
                     {getSubInput('email')}
                  </div>
                  <div className={styles.field}>
                     <label htmlFor='password'>Password</label>
                     <input
                        className={errors.password && styles.error}
                        placeholder="Password"
                        type='password'
                        {...register('password', {
                           required: 'Password is required',
                        })}
                     />
                     {getSubInput('password')}
                  </div>
                  <button
                     className={styles.formButton}
                     type='submit'>Login</button>
               </form>
               <div className={styles.authLink}>
                  <div>Don’t have an account?</div>
                  <div className={styles.link}>
                     <Link to='/sign-up'>Sign Up.</Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
};

SignIn.propTypes = {
   updateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
   updateUser: actionCreators.authentication.updateUser,
};

export default connect(
   null,
   mapDispatchToProps
)(SignIn);
