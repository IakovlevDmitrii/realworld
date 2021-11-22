import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './SignIn.module.scss';

const { section, container, content, title, invalid, authLink, link } = styles;

const SignIn = () => {

   const validationSchema = Yup.object().shape({
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid'),
      password: Yup.string()
         .required('Password is required')
   });

   const { register, handleSubmit, formState: {errors, isValid} } = useForm({
      resolver: yupResolver(validationSchema),
      mode: 'onChange',
      delayError: 700,
   });

   const onSubmit = data => console.log(data);

   return (
      <section className={section}>
         <div className={container}>
            <div className={content}>
               <div className={title}>
                  <h3>Sign In</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                     <label htmlFor='email'>
                        Email address
                     </label>
                     <input
                        id='email'
                        className={errors.email ? invalid : ''}
                        placeholder="Email address"
                        type='email'
                        {...register("email")}
                     />
                     {errors.email &&
                        <span>
                           {errors.email?.message}
                        </span>
                     }
                  </fieldset>
                  <fieldset>
                     <label htmlFor='password'>
                        Password
                     </label>
                     <input
                        id='password'
                        className={errors.password ? invalid : ''}
                        placeholder="Password"
                        type='password'
                        {...register("password")}
                     />
                     {errors.password &&
                        <span>
                           {errors.password?.message}
                        </span>
                     }
                  </fieldset>
                  <button
                     type='submit'
                     disabled={!isValid}
                  >
                     Login
                  </button>
               </form>
               <div className={authLink}>
                  <div>Don’t have an account?</div>
                  <div className={link}>
                     <Link to='/auth'>
                        Sign Up.
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
};

export default SignIn;
