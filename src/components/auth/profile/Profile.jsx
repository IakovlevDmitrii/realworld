import React, { useState } from 'react';
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import realWorldApi from '../../../service';
import actionCreators from '../../../store/action-creators';
import Spinner from "../../spinner";

import styles from './Profile.module.scss';

const {
   section,
   containerNarrow,
   content,
   title,
   error,
   formButton,
} = styles;

const Profile = ({ user, updateUser }) => {
   const { email, username, token } = user;
   const [ isLoading, setIsLoading ] = useState(false);
   const [ hasErrors, setHasError ] = useState({});

   const { register, handleSubmit, formState: {errors} } = useForm();

   const onSubmit = (data) => {
      const userDetailsToUpdate = {};

      // Если в data есть заполненные поля сохраним их в userDetailsToUpdate
      for (const key in data) {
         if(data[key]
            && Object.prototype.hasOwnProperty.call(data,key)){
            userDetailsToUpdate[key] = data[key];
         }
      }

      realWorldApi
         .authentication
         .update(token, userDetailsToUpdate)
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
      <section className={section}>
         <div className={containerNarrow}>
            <div className={content}>
               <div className={title}>
                  <h3>Edit Profile</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                     <label htmlFor='username'>Username</label>
                     <input
                        className={errors.username ? error : ''}
                        placeholder={username}
                        type='text'
                        {...register('username', {
                           // required: 'Username is required',
                        })}
                     />
                     {errors.username && <span>{errors.username?.message}</span>}
                     {hasErrors.username && (
                        <span>Username {hasErrors.username[0]}</span>)}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='email'>Email address</label>
                     <input
                        className={errors.email ? error : ''}
                        placeholder={email}
                        type='email'
                        {...register("email", {
                           // required: 'Email is required',
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
                     <label htmlFor='password'>New password</label>
                     <input
                        className={errors.password ? error : ''}
                        placeholder='New password'
                        type='password'
                        {...register('password', {
                           // required: 'Password is required',
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
                     <label htmlFor='avatar'>Avatar image (url)</label>
                     <input
                        className={errors.avatar ? error : ''}
                        placeholder='Avatar image'
                        type='url'
                        {...register("avatar", {
                           pattern: {
                              // value: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                              value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
                              message: "Invalid url address"
                           }
                        })}
                     />
                     {errors.avatar && <span>{errors.avatar.message}</span>}
                  </fieldset>
                  <button
                     className={formButton}
                     type='submit'>Save</button>
               </form>
            </div>
         </div>
      </section>
   );
};

Profile.propTypes = {
   user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
   }).isRequired,
   updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authentication }) => ({
   user: authentication.user,
});
const mapDispatchToProps = {
   updateUser: actionCreators.authentication.updateUser,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(Profile);
