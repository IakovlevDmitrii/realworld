import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import RealWorldApiService from '../../service';
import actionCreators from '../../store/action-creators';
import transformArticle from '../../utils/transform-article';

import Spinner from "../spinner";
import ArticleEditor from '../article-editor';

const NewArticlePage = ({ token, isTheArticleNew, newArticleCreated }) => {
   // title: 'React',
   // description: 'I am learning React-Redux',
   // body: 'I like this',
   // tagList: [{value: 'a'}, {value: 'b'}]

   const [ hasErrors, setHasErrors ] = useState({});
   const [ isLoading, setIsLoading ] = useState(false);
   const [ slug, setSlug ] = useState('');

   const getInitialValues = () => ({
      title: '',
      description: '',
      body: '',
      tagList: [
         {value: ''}
      ]
   });

   const initialValues = useMemo(() => getInitialValues(), []);

   // const initialValues = {
   //    title: '',
   //    description: '',
   //    body: '',
   //    tagList: [
   //       {value: ''}
   //    ]
   // };
   const [ defaultValues, setDefaultValues ] = useState(initialValues);

   useEffect(() => (
      () => {
         setIsLoading(false);
         setDefaultValues(initialValues);
      }
   ), [initialValues]);

   // const onSubmit = ({ tagList, ...rest }) => {
   const onSubmit = ( newArticleData ) => {
      setIsLoading(true);

      RealWorldApiService
         .articles
         .create(token, newArticleData)
         .then( (res) => {
            const articleDetails = res.article;
            const serverErrors = res.errors;

            if(articleDetails) {
               setSlug(articleDetails.slug);

               newArticleCreated(
                  transformArticle(articleDetails)
               )
            }

            if(serverErrors) {
               // tagList в newArticleData это массив строк вида ['a', 'b']
               // а в defaultValues надо сохранить tagList в виде [ {value: 'a'}, {value: 'b'} ]
               const { article } = newArticleData;
               const { tagList, ...rest } = article;
               const newArticle = {...rest};
               newArticle.tagList = [];

               tagList.forEach((tag) => {
                  (newArticle.tagList).push({value: tag})
               });

               setDefaultValues(newArticle);
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
         {isTheArticleNew ?
            <Redirect to={`/articles/:${slug}`} />
            :
            <ArticleEditor
               title='Create new article'
               onFormSubmit={onSubmit}
               defaultValues={defaultValues}
               hasErrors={hasErrors}
            />
         }
      </Route>
   )
};

NewArticlePage.propTypes = {
   token: PropTypes.string.isRequired,
   isTheArticleNew: PropTypes.bool.isRequired,
   newArticleCreated: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authentication, articleData }) => ({
   token: authentication.user.token,
   isTheArticleNew: articleData.isTheArticleNew
});

const mapDispatchToProps = {
   newArticleCreated: actionCreators.articleData.newArticleCreated
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(NewArticlePage);

// {"article":{
// "slug":"React-A-900",
// "title":"React A",
// "description":"I am learning React",
// "body":"I like",
// "createdAt":"2022-01-25T22:18:02.824Z",
// "updatedAt":"2022-01-25T22:18:02.824Z",
// "tagList":["a","b"],"author":{"username":"aaaf","bio":null,"image":"https://api.realworld.io/images/smiley-cyrus.jpeg"},"favoritedBy":[],"_count":{"favoritedBy":0},
// "favoritesCount":0,
// "favorited":false}}