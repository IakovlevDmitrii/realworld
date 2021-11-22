import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Fieldset from "../../fieldset";
import styles from './SignUp.module.scss';

const {
   section, container, content, title, authLink, link
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

   const formConfig = [
      {
         label: 'Username',
         name: 'username',
         placeholder: "Username",
         type: 'text'
      },
      {
         label: 'Email address',
         name: 'email',
         placeholder: "Email address",
         type: 'email'
      },
      {
         label: 'Password',
         name: 'password',
         placeholder: "Password",
         type: 'password'
      },
      {
         label: 'Repeat Password',
         name: 'confirmPassword',
         placeholder: "Password",
         type: 'password'
      },
   ];

   const formRender = formConfig.map((field) => {
      const {
         label,
         name,
         placeholder,
         type,
      } = field;

      return (
         <Fieldset
            errorMessage={errors[name]?.message}
            hasError={[name] in errors}
            key={name}
            label={label}
            name={name}
            placeholder={placeholder}
            register={register("email")}
            type={type}
         />
      )
   });

   console.log(errors);


   return (
      <section className={section}>
         <div className={container}>
            <div className={content}>
               <div className={title}>
                  <h3>Create new account</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  {formRender}
                   <Fieldset
                     errorMessage={errors.agreement?.message}
                     hasError={'agreement' in errors}
                     label='I agree to the processing of my personal information'
                     name='agreement'
                     register={register("agreement")}
                     type='checkBox'
                  />
                  <button type='submit'>
                     Create
                  </button>
               </form>
               <div className={authLink}>
                  <div>Already have an account?</div>
                  <div className={link}>
                     <Link to='/auth'>Sign In.</Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default SignUp;

/*
   <Fieldset
      errorMessage={errors.username?.message}
      hasError={'username' in errors}
      label='Username'
      name='username'
      placeholder="Username"
      register={register("username")}
      type='text'
   />
   <Fieldset
      errorMessage={errors.email?.message}
      hasError={'email' in errors}
      label='Email address'
      name='email'
      placeholder="Email address"
      register={register("email")}
      type='email'
   />
   <Fieldset
      errorMessage={errors.password?.message}
      hasError={'password' in errors}
      label='Password'
      name='password'
      placeholder="Password"
      register={register("password")}
      type='password'
   />

 */
