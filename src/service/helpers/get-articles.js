import { format } from 'date-fns';
import getResource from './get-resource';
import cropText from './crop-text';
import BASE_URL from './base-url';

/* Функция получает всю информацию о списке статей,
а возвращает только ту часть, которая нам нужна */
const getArticles = async (page) => {
  try {
    const URL = `${BASE_URL}/articles?limit=5&offset=${(page - 1) * 5}`;

    /* Получим всю информацию о списке статей */
    const response = await getResource(URL);
    const { articles, articlesCount } = response;

    /* В newArticles сохраним только нужную нам информацию о статьях */
    const newArticles = articles.map((article) => {
      const { author, body, createdAt, favorited, favoritesCount, slug, tagList, title } = article;

      return {
        author: {
          image: author.image,
          username: author.username,
        },
        body: cropText(body),
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
