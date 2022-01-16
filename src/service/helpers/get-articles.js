import { format } from 'date-fns';
import getResource from './get-resource';
import { cropText } from '../../utils';
import BASE_URL from './base-url';

const getArticles = async (page) => {
  const url = `${BASE_URL}/articles?limit=5&offset=${(page - 1) * 5}`;

  try {
    const response = await getResource(url);
    const { articles, articlesCount } = response;

    const newArticles = articles.map((article) => {
      const { author, body, createdAt, favorited, favoritesCount, slug, tagList, title } = article;

      return {
        author: {
          image: author.image,
          username: author.username,
        },
        body: cropText(body, 170),
        createdAt: format(new Date(createdAt), 'MMMM d, yyyy'),
        favorited,
        favoritesCount,
        slug,
        tagList,
        title,
      };
    });

    return {
      articles: newArticles,
      articlesCount,
    };
  } catch {
    throw new Error();
  }
};

export default getArticles;
