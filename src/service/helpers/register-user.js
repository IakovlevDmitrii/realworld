import BASE_URL from './base-url';

const registerUser = async (username, email, password) => {
  try {
    const data = { user: { username, email, password } };

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch {
    throw new Error();
  }
};

export default registerUser;
