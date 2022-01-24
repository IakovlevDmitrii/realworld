import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import RealWorldApiService from '../../service';
import Spinner from "../spinner";
import ArticleEditor from '../article-editor';

const NewArticlePage = ({ token }) => {
   // title: 'React',
   // description: 'I am learning React-Redux',
   // body: 'I like this',
   // tagList: [{value: 'a'}, {value: 'b'}]

   const [ isLoading, setIsLoading ] = useState(false);
   const [ hasErrors, setHasErrors ] = useState({});
   const [ isNewArticleCreated, setIsNewArticleCreated ] = useState(false);

   useEffect(() => (
      () => {
         setIsLoading(false);
         setIsNewArticleCreated(false);
      }
   ), []);

   // const onSubmit = ({ tagList, ...rest }) => {
   const onSubmit = ( articleData ) => {
      setIsLoading(true);

      RealWorldApiService
         .articles
         .create(token, articleData)
         .then( (res) => {
            const articleDetails = res.article;
            const serverErrors = res.errors;

            if(articleDetails) {
               setIsNewArticleCreated(true);
            }

            if(serverErrors) {
               setHasErrors(serverErrors);
            }
         })
         .catch( (err) => {
            throw new Error(err.message);
         })
         .finally(() => {
            setIsLoading(false);
         })
   };

   if(isLoading) {
      return <Spinner />
   }

   return (
      <Route path='/new-article'>
         {isNewArticleCreated ?
            <Redirect to="/articles/:slug" />
            :
            <ArticleEditor
               title='Create new article'
               onFormSubmit={onSubmit}
               hasErrors={hasErrors}
            />
         }
      </Route>
   )
};

NewArticlePage.propTypes = {
   token: PropTypes.string.isRequired
};

const mapStateToProps = ({ authentication }) => ({
   token: authentication.user.token
});

export default connect(mapStateToProps)(NewArticlePage);
