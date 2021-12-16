import React from 'react';
import { useForm } from "react-hook-form";
import styles from './Profile.module.scss';

const {
   section, container, content, title, error
} = styles;

const Profile = () => {
   // const validationSchema = Yup.object().shape({
   //    username: Yup.string()
   //       .required('Username is required')
   //       .min(3, 'Username must be at least 3 characters')
   //       .max(20, 'Username must not exceed 20 characters'),
   //    email: Yup.string()
   //       .required('Email is required')
   //       .email('Email is invalid'),
   //    password: Yup.string()
   //       .required('Password is required')
   //       .min(6, 'Password must be at least 6 characters')
   //       .max(40, 'Password must not exceed 40 characters'),
   //    avatar: Yup.string()
   //       .url()
         // .matches(
         //    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
         //    'Enter correct url!'
         // )
   // });

   const {
      register,
      handleSubmit,
      formState: {errors}
   } = useForm({
      mode: 'onSubmit',
   });

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <section className={section}>
         <div className={container}>
            <div className={content}>
               <div className={title}>
                  <h3>Edit Profile</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                     <label htmlFor='username'>Username</label>
                     <input
                        id='username'
                        className={errors.username ? error : ''}
                        placeholder='John Doe'
                        type='text'
                        {...register("username")}
                     />
                     {errors.username && <span>{errors.username?.message}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='email'>Email address</label>
                     <input
                        id='email'
                        className={errors.email ? error : ''}
                        placeholder='john@example.com'
                        type='email'
                        {...register("email")}
                     />
                     {errors.email && <span>{errors.email?.message}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='password'>New password</label>
                     <input
                        id='password'
                        className={errors.password ? error : ''}
                        placeholder='New password'
                        type='password'
                        {...register("password")}
                     />
                     {errors.password && <span>{errors.password?.message}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='avatar'>Avatar image (url)</label>
                     <input
                        id='avatar'
                        className={errors.avatar ? error : ''}
                        placeholder='Avatar image'
                        type='text'
                        {...register("avatar")}
                     />
                     {errors.avatar && <span>{errors.avatar?.message}</span>}
                  </fieldset>
                  <button type='submit'>Save</button>
               </form>
            </div>
         </div>
      </section>
   );
};

export default Profile;
