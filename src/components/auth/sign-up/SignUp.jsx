import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './SignUp.module.scss';

const {
   section, container, content, title, error, authLink, link
} = styles;

const SignUp = () => {

   const validationSchema = Yup.object().shape({
      username: Yup.string()
         .required('Username is required')
         .min(3, 'Username must be at least 3 characters')
         .max(20, 'Username must not exceed 20 characters'),
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid'),
      password: Yup.string()
         .required('Password is required')
         .min(6, 'Password must be at least 6 characters')
         .max(40, 'Password must not exceed 40 characters'),
      confirmPassword: Yup.string()
         .required('Repeat Password is required')
         .oneOf([Yup.ref('password'), null], 'Password does not match'),
      agreement: Yup.bool()
         .oneOf([true], 'Agreement is required')
   });

   const { register, handleSubmit, formState: {errors} } = useForm({
      resolver: yupResolver(validationSchema),
      mode: 'onSubmit',
   });

   const onSubmit = data => console.log(data);

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
                        id='username'
                        className={errors.username ? error : ''}
                        placeholder='Username'
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
                        placeholder='Email address'
                        type='email'
                        {...register("email")}
                     />
                     {errors.email && <span>{errors.email?.message}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='password'>Password</label>
                     <input
                        id='password'
                        className={errors.password ? error : ''}
                        placeholder='Password'
                        type='password'
                        {...register("password")}
                     />
                     {errors.password && <span>{errors.password?.message}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='confirmPassword'>Repeat Password</label>
                     <input
                        id='confirmPassword'
                        className={errors.confirmPassword ? error : ''}
                        placeholder='Password'
                        type='password'
                        {...register("confirmPassword")}
                     />
                     {errors.confirmPassword && <span>{errors.confirmPassword?.message}</span>}
                  </fieldset>
                  <fieldset>
                     <input
                        id='agreement'
                        className={errors.agreement ? error : ''}
                        type='checkBox'
                        {...register("agreement")}
                     />
                     <label htmlFor='agreement'>
                        I agree to the processing of my personal information
                     </label>
                     {errors.agreement && <span>{errors.agreement?.message}</span>}
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

export default SignUp;
