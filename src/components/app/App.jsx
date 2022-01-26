import React from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../header';
import ArticlesPage from '../pages/articles-page';
import NewArticlePage from '../new-article-page';
import { SignIn, SignUp, EditProfile } from '../authComponents';

import styles from './styles/app.module.scss';

const App = ({ isLoggedIn }) => (
   <div className={styles.content}>
      <Header />
      <Switch>
         <Route path='/articles'>
            <ArticlesPage />
         </Route>
         <Route path='/new-article' component={NewArticlePage} />
         <Route path='/sign-in'>
            {isLoggedIn ? <Redirect to="/articles" /> : <SignIn />}
         </Route>
         <Route path='/sign-up'>
            {isLoggedIn ? <Redirect to="/articles" /> : <SignUp />}
         </Route>
         <Route path='/profile'>
            {isLoggedIn ? <EditProfile /> : <Redirect to="/articles" />}
         </Route>
         <Redirect from='/' to='/articles' />
      </Switch>
   </div>
);

App.propTypes = {
   isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = ({ authentication }) => ({
   isLoggedIn: authentication.isLoggedIn
});

export default connect(mapStateToProps)(App);
