import { registerUser, loginUser, editProfile, getArticle, getArticles, createArticle } from './helpers';

const authentication = {
  register: (username, email, password) => registerUser(username, email, password),
  login: (email, password) => loginUser(email, password),
  edit: (token, detailsToChange) => editProfile(token, detailsToChange),
};

const articles = {
  all: (page) => getArticles(page),
  get: (slug) => getArticle(slug),
  create: (token, article) => createArticle(token, article),
};

class RealWorldApiService {
  articles = articles;

  authentication = authentication;
}

const realWorldApiService = new RealWorldApiService();

export default realWorldApiService;
