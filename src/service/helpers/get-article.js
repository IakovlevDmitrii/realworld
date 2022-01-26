import getResource from './get-resource';
import transformArticle from '../../utils/transform-article';
import BASE_URL from './base-url';

const getArticle = async (segment) => {
  const url = `${BASE_URL}/articles/${segment}`;

  try {
    const response = await getResource(url);

    return transformArticle(response.article);
  } catch {
    throw new Error();
  }
};

export default getArticle;
