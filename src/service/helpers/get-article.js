import { format } from 'date-fns';
import getResource from './get-resource';
import BASE_URL from './base-url';

const getArticle = async (segment) => {
  try {
    const URL = `${BASE_URL}/articles/${segment}`;
    const response = await getResource(URL);
    const { article } = response;
    const { author, body, createdAt, favorited, favoritesCount, slug, tagList, title } = article;

    return {
      author: {
        image: author.image,
        username: author.username,
      },
      body,
      createdAt: format(new Date(createdAt), 'MMMM d, yyyy'),
      favorited,
      favoritesCount,
      slug,
      tagList,
      title,
    };
  } catch {
    throw new Error();
  }
};

export default getArticle;
