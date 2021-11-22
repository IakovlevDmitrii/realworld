import { format } from 'date-fns';
import getResource from './get-resource';
import { cropText } from '../utils';

// const BASE_URL = 'https://conduit.productionready.io/api';
const BASE_URL = 'https://cirosantilli-realworld-express.herokuapp.com/api';

/* Функция получает всю информацию о списке статей,
а возвращает только ту часть, которая нам нужна */
const getArticles = async (page) => {
  try {
    const ARTICLES_PER_PAGE = 5;
    const LIMIT = `limit=${ARTICLES_PER_PAGE}`;
    const OFFSET = `offset=${(page - 1) * ARTICLES_PER_PAGE}`;
    const URL = `${BASE_URL}/articles?${LIMIT}&${OFFSET}`;

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

const getArticleData = async (segment) => {
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

class RealWorldApiService {
  getArticleList = (page) => getArticles(page);

  getArticle = (slug) => getArticleData(slug);
}

const realWorldApiService = new RealWorldApiService();

export default realWorldApiService;
