import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RealWorldApiService from '../../service';
import Spinner from "../spinner";
import ErrorIndicator from "../errors/error-indicator";
import ArticleEditor from '../article-editor';

const ArticleCreationPage = ({ token }) => {
   // title: 'React',
   // description: 'I am learning React-Redux',
   // body: 'I like this',
   // tagList: [{value: 'a'}, {value: 'b'}]

   const [ hasError, setHasError ] = useState(false);
   const [ isLoading, setIsLoading ] = useState(false);

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


      console.log(articleData);

      RealWorldApiService
         .articles
         .create(token, articleData)
         .then( () => {
            setIsLoading(false);
         })
         .catch( () => {
            setHasError(true);
            setIsLoading(false);
         });
   };

   if(isLoading) { return <Spinner /> }
   if(hasError) { return <ErrorIndicator /> }

   return (
      <ArticleEditor
         onFormSubmit={onSubmit}
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
