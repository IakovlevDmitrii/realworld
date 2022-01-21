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
    },

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

    {
      name: 'passwordConfirmation',
      label: 'Repeat Password',
      placeholder: 'Password',
      type: 'password',
    },

    {
      name: 'agreement',
      label: 'I agree to the processing of my personal information',
      type: 'checkBox',
      labelBehind: true,
      id: 'agreement',
    },
  ],

  editProfile: [
    {
      name: 'username',
      label: 'Username',
      placeholder: null,
      type: 'text',
    },

    {
      name: 'email',
      label: 'Email address',
      placeholder: null,
      type: 'email',
    },

    {
      name: 'password',
      label: 'New password',
      placeholder: 'New password',
      type: 'password',
    },

    {
      name: 'avatar',
      label: 'Avatar image (url)',
      placeholder: 'Avatar image',
      type: 'url',
    },
  ],
};

export default formConfig;
