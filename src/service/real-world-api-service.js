import { registerUser, login, updateUser, getArticle, getArticles } from './helpers';

const authentication = {
  register: (username, email, password) => registerUser(username, email, password),
  login: (email, password) => login(email, password),
  update: (token, args) => updateUser(token, args),
};

const articles = {
  all: (page) => getArticles(page),
  get: (slug) => getArticle(slug),
};

class RealWorldApiService {
  articles = articles;

  authentication = authentication;
}

const realWorldApiService = new RealWorldApiService();

export default realWorldApiService;
