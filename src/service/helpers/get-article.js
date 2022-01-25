import { format } from 'date-fns';
import getResource from './get-resource';
import BASE_URL from './base-url';

const getArticle = async (segment) => {
  const url = `${BASE_URL}/articles/${segment}`;

  try {
    const response = await getResource(url);
    const { author, createdAt, description, favorited, favoritesCount, slug, tagList, title } = response.article;

    return {
      author: {
        image: author.image,
        username: author.username,
      },
      createdAt: format(new Date(createdAt), 'MMMM d, yyyy'),
      description,
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
