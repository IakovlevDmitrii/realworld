import { format } from 'date-fns';

// const BASE_URL = 'https://conduit.productionready.io/api';
// const BASE_URL = 'http://kata.academy:8022/api';
const BASE_URL = 'https://api.realworld.io/api';

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

const getResource = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch {
    throw new Error();
  }
};

const getArticle = async (segment) => {
  const url = `${BASE_URL}/articles/${segment}`;

  try {
    const response = await getResource(url);
    const { author, body, createdAt, favorited, favoritesCount, slug, tagList, title } = response.article;

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

// Запрос на регистрацию нового пользователя
const registerUser = async (username, email, password) => {
  const url = `${BASE_URL}/users`;
  const data = {
    user: {
      username,
      email,
      password,
    },
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    return response.json();
  } catch {
    throw new Error();
  }
};

// Запрос на авторизацию пользователя
const login = async (email, password) => {
  const url = `${BASE_URL}/users/login`;

  const data = {
    user: {
      email,
      password,
    },
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, requestOptions);
    return response.json();
  } catch {
    throw new Error();
  }
};

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

export { cropText, getResource, getArticle, getArticles, registerUser, login, updateUser };
