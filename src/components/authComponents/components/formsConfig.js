const formConfig = {
  singIn: [
    {
      name: 'email',
      label: 'Email address',
      placeholder: 'Email address',
      type: 'email',
    },

    {
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      type: 'password',
    },
  ],

  singUp: [
    {
      name: 'username',
      label: 'Username',
      placeholder: 'Username',
      type: 'text',
      validationRules: {
        required: 'Username is required',
        minLength: {
          value: 3,
          message: 'Username must be at least 3 characters',
        },
        maxLength: {
          value: 20,
          message: 'Username must not exceed 20 characters',
        },
      },
    },

    {
      name: 'email',
      label: 'Email address',
      placeholder: 'Email address',
      type: 'email',
      validationRules: {
        required: 'Email is required',
        // react-hook-form examples
        // pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: 'Invalid email address',
        },
      },
    },

    {
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      type: 'password',
      validationRules: {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
        },
        maxLength: {
          value: 40,
          message: 'Password must not exceed 40 characters',
        },
      },
    },

    {
      name: 'passwordConfirmation',
      label: 'Repeat Password',
      placeholder: 'Password',
      type: 'password',
      validationRules: {
        required: 'Repeat Password is required',
        // validate: {
        //    match: (value) => {
        //       const { password } = getValues();
        //       return password === value || "Password does not match";
        //    }
        // },
      },
    },
  ],
};

export default formConfig;
