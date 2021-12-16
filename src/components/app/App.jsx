import React, { useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authActions } from '../../store/actions';

import Header from '../header';
import ArticleList from "../articles/article-list";
import ArticlePage from "../articles/article-page";
import SignIn from "../auth/sign-in";
import SignUp from "../auth/sign-up";
import Profile from '../auth/profile';

import loadFromLocalStorage from '../../utils';
import styles from './styles/app.module.scss';

const App = ({ auth, addUserDispatch,  loggedInDispatch }) => {

   const getUserFromLocalStorage = useCallback(
      () => {
         const userStr = loadFromLocalStorage('user');
         const { loggedIn } = auth;

         if(userStr && !loggedIn) {
            addUserDispatch(userStr);
            loggedInDispatch(true);
         }
      },
      [addUserDispatch, loggedInDispatch, auth]
   );

   useEffect(
      () => getUserFromLocalStorage(),
      [getUserFromLocalStorage]
   );

   const { loggedIn } = auth;

   return (
      <div className={styles.content}>
         <Header />
         <main>
            <Switch>
               <Route exact path='/articles' component={ArticleList} />
               <Route path='/articles/:slug' component={ArticlePage} />
               <Route path='/sign-in' component={SignIn} />
               <Route path="/sign-up">
                  {loggedIn ? <Redirect to="/articles" /> : <SignUp />}
               </Route>
               <Route path='/profile' component={Profile} />
               <Redirect from='/' to='/articles'/>
            </Switch>
         </main>
      </div>
   )
};

App.propTypes = {
   auth: PropTypes.shape({
      loggedIn: PropTypes.bool.isRequired,
   }).isRequired,
   addUserDispatch: PropTypes.func.isRequired,
   loggedInDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({auth}) => ({auth});
const mapDispatchToProps = {
   addUserDispatch: authActions.addUser,
   loggedInDispatch: authActions.loggedIn,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(App);
