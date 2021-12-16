/* Функция для создания запроса на получение данных,
используя Fetch API, и получения JSON файла из ответа */

const getResource = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch {
    throw new Error();
  }
};

export default getResource;
