import BASE_URL from './base-url';

// Запрос на имзенение информации о пользователе
const updateUser = async (token, userDetailsToUpdate) => {
  const url = `${BASE_URL}/user`;

  const requestBody = {
    user: {
      ...userDetailsToUpdate,
    },
  };

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, requestOptions);
    return response.json();
  } catch {
    throw new Error();
  }
};

export default updateUser;
