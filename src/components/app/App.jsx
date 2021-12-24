import React from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// import components
import Header from '../header';
import SignIn from "../auth/sign-in";
import SignUp from "../auth/sign-up";
import Profile from '../auth/profile';
import ArticleList from "../articles/article-list";
import ArticlePage from '../articles/article-page/ArticlePage';

import styles from './styles/app.module.scss';

const App = ({ auth }) => (
   <div className={styles.content}>
      <Header />
      <main>
         <Switch>
            <Route path='/articles/:slug' component={ArticlePage} />
            <Route path='/articles' component={ArticleList} />
            <Route path='/sign-in'>
               {auth.isLoggedIn ? <Redirect to="/articles" /> : <SignIn />}
            </Route>
            <Route path='/sign-up'>
               {auth.isLoggedIn ? <Redirect to="/articles" /> : <SignUp />}
            </Route>
            <Route path='/profile' component={Profile} />
            <Redirect from='/' to='/articles'/>
         </Switch>
      </main>
   </div>
);

App.propTypes = {
   auth: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired,
   }).isRequired,
};

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps)(App);
