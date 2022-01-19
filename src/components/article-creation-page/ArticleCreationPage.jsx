import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RealWorldApiService from '../../service';
import Spinner from "../spinner";
import ArticleEditor from '../article-editor';

const ArticleCreationPage = ({ token }) => {
   // title: 'React',
   // description: 'I am learning React-Redux',
   // body: 'I like this',
   // tagList: [{value: 'a'}, {value: 'b'}]

   const [ isLoading, setIsLoading ] = useState(false);
   const [ hasErrors, setHasErrors ] = useState({});

   const onSubmit = ({ tagList, ...rest }) => {
      setIsLoading(true);

      const articleData = {
         article: {...rest}
      };

      const tagsListToSend = [];

      // Если есть теги, сохраним их в массив tagsListToSend
      tagList.forEach(({ value }) => {
         if(value) {
            tagsListToSend.push(value)
         }
      });

      if(tagsListToSend.length) {
         articleData
            .article
            .tagList = tagsListToSend
      }

      RealWorldApiService
         .articles
         .create(token, articleData)
         .then( (res) => {
            //    if(res.article) {...}
            if(res.errors) {setHasErrors(res.errors)}

            setIsLoading(false);
         })
         .catch( (err) => {
            setIsLoading(false);

            throw new Error(err.message);
         });
   };

   if(isLoading) { return <Spinner /> }

   return (
      <ArticleEditor
         title='Create new article'
         onFormSubmit={onSubmit}
         hasErrors={hasErrors}
      />
   )
};

ArticleCreationPage.propTypes = {
   token: PropTypes.string.isRequired
};

const mapStateToProps = ({ authentication }) => ({
   token: authentication.user.token
});

export default connect(mapStateToProps)(ArticleCreationPage);
