import React from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// import components
import ArticleCreator from '../article-creator';
import { ArticleList, ArticlePage } from '../articles';
import { SignIn, SignUp, Profile } from '../auth';
import Header from '../header';

import styles from './styles/app.module.scss';

const App = ({ isLoggedIn }) => (
   <div className={styles.content}>
      <Header />
      <ArticleCreator />
      <Switch>
         <Route path='/articles/:slug' component={ArticlePage} />
         <Route path='/articles' component={ArticleList} />
         <Route path='/sign-in'>
            {isLoggedIn ? <Redirect to="/articles" /> : <SignIn />}
         </Route>
         <Route path='/sign-up'>
            {isLoggedIn ? <Redirect to="/articles" /> : <SignUp />}
         </Route>
         <Route path='/profile'>
            {isLoggedIn ? <Profile /> : <Redirect to="/articles" />}
         </Route>
         <Redirect from='/' to='/articles'/>
      </Switch>
   </div>
);

App.propTypes = {
   isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ authentication }) => ({
   isLoggedIn: authentication.isLoggedIn
});

export default connect(mapStateToProps)(App);
