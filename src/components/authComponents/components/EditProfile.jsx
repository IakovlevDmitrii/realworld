import React, { useState } from 'react';
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import realWorldApi from '../../../service';
import actionCreators from '../../../store/action-creators';
import Spinner from "../../spinner";

import styles from '../styles/authComponents.module.scss';

const EditProfile = ({ user, updateUser }) => {
   const { email, username, token } = user;

   const [ isLoading, setIsLoading ] = useState(false);
   const [ hasErrors, setHasError ] = useState({});

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = (data) => {
      const detailsToChange = {};

      // Если в data есть заполненные поля сохраним их в detailsToChange
      for (const key in data) {
         if(data[key]
            && Object.prototype.hasOwnProperty.call(data,key)){
            detailsToChange[key] = data[key];
         }
      }

      realWorldApi
         .authentication
         .edit(token, detailsToChange)
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
         <div className={styles.container}>
            <div className={styles.content}>
               <div className={styles.title}>
                  <h3>Edit Profile</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.field}>
                     <label htmlFor='username'>Username</label>
                     <input
                        className={errors.username ? styles.error : ''}
                        placeholder={username}
                        type='text'
                        {...register('username', {
                           // required: 'Username is required',
                        })}
                     />
                     {errors.username && <span>{errors.username?.message}</span>}
                     {hasErrors.username && (
                        <span>Username {hasErrors.username[0]}</span>)}
                  </div>
                  <div className={styles.field}>
                     <label htmlFor='email'>Email address</label>
                     <input
                        className={errors.email ? styles.error : ''}
                        placeholder={email}
                        type='email'
                        {...register("email", {
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
                     <label htmlFor='password'>New password</label>
                     <input
                        className={errors.password ? styles.error : ''}
                        placeholder='New password'
                        type='password'
                        {...register('password', {
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
                     <label htmlFor='avatar'>Avatar image (url)</label>
                     <input
                        className={errors.avatar ? styles.error : ''}
                        placeholder='Avatar image'
                        type='url'
                        {...register("avatar", {
                           pattern: {
                              // value: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                              value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/,
                              message: "Invalid url address"
                           }
                        })}
                     />
                     {errors.avatar && <span>{errors.avatar.message}</span>}
                  </div>
                  <button
                     className={styles.formButton}
                     type='submit'>
                     Save
                  </button>
               </form>
            </div>
         </div>
      </section>
   );
};

EditProfile.propTypes = {
   user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired
   }).isRequired,
   updateUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ authentication }) => ({
   user: authentication.user
});
const mapDispatchToProps = {
   updateUser: actionCreators.authentication.updateUser
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(EditProfile);
