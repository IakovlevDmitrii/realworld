import { registerUser, loginUser, editProfile, getArticle, getArticlesPreviews, createArticle } from './helpers';

const authentication = {
  register: (username, email, password) => registerUser(username, email, password),
  login: (email, password) => loginUser(email, password),
  edit: (token, detailsToChange) => editProfile(token, detailsToChange),
};

const articles = {
  getPreviews: (page) => getArticlesPreviews(page),
  getArticle: (slug) => getArticle(slug),
  create: (token, content) => createArticle(token, content),
};

class RealWorldApiService {
  articles = articles;

  authentication = authentication;
}

const realWorldApiService = new RealWorldApiService();

export default realWorldApiService;
