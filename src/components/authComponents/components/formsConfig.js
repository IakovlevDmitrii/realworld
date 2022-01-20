const formConfig = {
  singIn: [
    {
      label: 'Email address',
      name: 'email',
      placeholder: 'Email address',
      type: 'email',
      validationRules: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: 'Invalid email address',
        },
      },
    },

    {
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      validationRules: {
        required: 'Password is required',
      },
    },
  ],
};

export default formConfig;
