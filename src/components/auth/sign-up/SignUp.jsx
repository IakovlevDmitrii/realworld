import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import realWorldApiService from '../../../service';
import authActions from '../../../store/actions';

import Spinner from "../../spinner";

import styles from './SignUp.module.scss';

const { addUser } = authActions;
const {
   section, container, content, title, error, authLink, link
} = styles;

const SignUp = ({ addUserDispatch }) => {
   const [ isLoading, setIsLoading ] = useState(false);
   const [ hasErrors, setHasError ] = useState({});

   useEffect(() => (
      () => {setHasError({})}
   ), []);

   const { register, handleSubmit, watch, formState: {errors} } = useForm();
   const watchPassword = watch('password');

   const onSubmit = (data) => {
      const { username, email, password } = data;

      setIsLoading(true);
      realWorldApiService
         .Auth
         .register(username, email, password)
         .then((res) => {
            if(res.user) {addUserDispatch(res.user)}
            if(res.errors) {setHasError(res.errors)}
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
                  <h3>Create new account</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                     <label htmlFor='username'>Username</label>
                     <input
                        className={
                           (errors.username || hasErrors.username) ? error : ''}
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
                     {hasErrors.username && <span>Username {hasErrors.username[0]}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='email'>Email address</label>
                     <input
                        className={( errors.email || hasErrors.email) ? error : ''}
                        placeholder='Email address'
                        type='email'
                        {...register("email", {
                           required: 'Email is required',
                           // pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                           pattern: {
                              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              message: "Invalid email address"
                           }
                        })}
                     />
                     {errors.email && <span>{errors.email.message}</span>}
                     {hasErrors.email && <span>Email {hasErrors.email[0]}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='password'>Password</label>
                     <input
                        className={errors.password ? error : ''}
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
                  </fieldset>
                  <fieldset>
                     <label htmlFor='confirmPassword'>Repeat Password</label>
                     <input
                        className={errors.confirmPassword ? error : ''}
                        placeholder='Password'
                        type='password'
                        {...register('confirmPassword', {
                           required: 'Repeat Password is required',
                           validate: {
                              match: (value) => value === watchPassword,
                           }
                        })}
                     />
                     {errors.confirmPassword &&
                     errors.confirmPassword.type === 'match' && (
                        <span>Password does not match</span>
                     )}
                  </fieldset>
                  <fieldset>
                     <input
                        id='agreement'
                        className={errors.agreement ? error : ''}
                        type='checkBox'
                        {...register('agreement', {
                           required: 'Agreement is required',
                        })}
                     />
                     <label htmlFor='agreement'>
                        I agree to the processing of my personal information
                     </label>
                     {errors.agreement && <span>{errors.agreement.message}</span>}
                  </fieldset>
                  <button type='submit'>Create</button>
               </form>
               <div className={authLink}>
                  <div>Already have an account?</div>
                  <div className={link}>
                     <Link to='/sign-in'>Sign In.</Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

SignUp.propTypes = {
   addUserDispatch: PropTypes.func.isRequired
};

const mapDispatchToProps = {
   addUserDispatch: addUser,
};

export default connect(
   null,
   mapDispatchToProps
)(SignUp);
