import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from '../header';
import ArticleList from "../articles/article-list";
import ArticlePage from "../articles/article-page";

import SignIn from "../auth/sign-in";
import SignUp from "../auth/sign-up";

import styles from './styles/app.module.scss';

const App = () => (
   <div className={styles.content}>
      <Header />
      <main>
         <Switch>
            <Route exact path='/articles' component={ArticleList} />
            <Route path='/articles/:slug' component={ArticlePage} />
            <Route path='/sign-in' component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
            <Redirect from='/' to='/articles'/>
         </Switch>
      </main>
   </div>
);

export default App;
