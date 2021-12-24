import { format } from 'date-fns';

const BASE_URL = 'https://conduit.productionready.io/api';
// const BASE_URL = 'http://kata.academy:8022/api';
// const BASE_URL = 'https://api.realworld.io/api';

// const BASE_URL = 'https://cirosantilli-realworld-express.herokuapp.com/api';

//    username: "aaaf",
//    email: "a@a.a",
//    password: "aaaaaa"

//    "email":"a@a.a",
//    "username":"aaaf",
//    "image":"https://api.realworld.io/images/smiley-cyrus.jpeg",
//    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5hIiwidXNlcm5hbWUiOiJhYWFmIiwiYmlvIjpudWxsLCJpbWFnZSI6Imh0dHBzOi8vYXBpLnJlYWx3b3JsZC5pby9pbWFnZXMvc21pbGV5LWN5cnVzLmpwZWciLCJpYXQiOjE2MzgxNzg3ODYsImV4cCI6MTY0MzM2Mjc4Nn0.9H6a61sSHFdH84mrK_YdqjIm_jiOElRWKTMUpKM_rXQ"

// email: "a@a.aaaa"
// image: "https://api.realworld.io/images/smiley-cyrus.jpeg"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5hYWFhIiwidXNlcm5hbWUiOiJhYWFmZmZmIiwiYmlvIjpudWxsLCJpbWFnZSI6Imh0dHBzOi8vYXBpLnJlYWx3b3JsZC5pby9pbWFnZXMvc21pbGV5LWN5cnVzLmpwZWciLCJpYXQiOjE2MzgxODA1NzQsImV4cCI6MTY0MzM2NDU3NH0.dLN_r6RwzTyxIy1xINznHQDDBvnOf9oHAjfcjoNuc0I"
// username: "aaaffff"

// email: "aaaa@a.aaa"
// image: "https://api.realworld.io/images/smiley-cyrus.jpeg"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYWFAYS5hYWEiLCJ1c2VybmFtZSI6ImFhYWZhYWFmZiIsImJpbyI6bnVsbCwiaW1hZ2UiOiJodHRwczovL2FwaS5yZWFsd29ybGQuaW8vaW1hZ2VzL3NtaWxleS1jeXJ1cy5qcGVnIiwiaWF0IjoxNjQwMTczMDI3LCJleHAiOjE2NDUzNTcwMjd9.qHeEeC13oR7AbkG4uVxw8MLnF9A0MuGGS0RF0PMnbaM"
// username: "aaafaaaff"

// Функция обрезает текс до 170-и символов
const cropText = (text) => {
  const redExp = /.{170}\S*/s;
  return text.length > 170 ? `${text.match(redExp)} ...` : text;
};

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

const login = async (email, password) => {
  try {
    const data = { user: { email, password } };

    const response = await fetch(`${BASE_URL}/users/login`, {
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

export { cropText, getResource, getArticle, getArticles, registerUser, login };
