import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import realWorldApiService from '../../../service';
import { authActions } from '../../../store/actions';

import Spinner from "../../spinner";

import styles from './SignIn.module.scss';

const { addUser } = authActions;
const { section, container, content, title, error, authLink, link } = styles;

const SignIn = ({ addUserDispatch }) => {
   const [ isLoading, setIsLoading ] = useState(false);
   const [ hasErrors, setHasError ] = useState({});

   useEffect(() => (
      () => {setHasError({})}
   ), []);

   const { register, handleSubmit, formState: {errors} } = useForm();

   const onSubmit = (data) => {
      const { email, password } = data;

      setIsLoading(true);

      realWorldApiService
         .Auth
         .login(email, password)
         .then((res) => {
            if(res.user) {addUserDispatch(res.user)}
            if(res.errors) {
               setHasError(res.errors)
            }
            setIsLoading(false);
         })
         .catch(err => { throw new Error(err.message) });
   };

   if(isLoading) { return <Spinner /> }

   return (
      <section className={section}>
         <div className={container}>
            <div className={content}>
               <div className={title}>
                  <h3>Sign In</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                     <label htmlFor='email'>Email address</label>
                     <input
                        className={
                           (errors.email || hasErrors['email or password'] ) ? error : ''}
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
                     {errors.email && <span>{errors.email.message}</span>}
                     {hasErrors['email or password'] && <span>Email  or password {hasErrors['email or password'][0]}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='password'>Password</label>
                     <input
                        className={
                           (errors.password || hasErrors['email or password'] ) ? error : ''}
                        placeholder="Password"
                        type='password'
                        {...register('password', {
                           required: 'Password is required',
                        })}
                     />
                     {errors.password && <span>{errors.password.message}</span>}
                     {hasErrors['email or password'] && <span>Email  or password {hasErrors['email or password'][0]}</span>}
                  </fieldset>
                  <button type='submit'>Login</button>
               </form>
               <div className={authLink}>
                  <div>Don’t have an account?</div>
                  <div className={link}>
                     <Link to='/sign-up'>Sign Up.</Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
};

SignIn.propTypes = {
   addUserDispatch: PropTypes.func.isRequired
};

const mapDispatchToProps = {
   addUserDispatch: addUser,
};

export default connect(
   null,
   mapDispatchToProps
)(SignIn);
