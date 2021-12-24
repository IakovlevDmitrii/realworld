import { registerUser, login, getArticle, getArticles } from './helpers';

const Auth = {
  register: (username, email, password) => registerUser(username, email, password),
  login: (email, password) => login(email, password),
};

const Articles = {
  all: (page) => getArticles(page),
  get: (slug) => getArticle(slug),
};

class RealWorldApiService {
  Articles = Articles;

  Auth = Auth;
}

const realWorldApiService = new RealWorldApiService();

export default realWorldApiService;
