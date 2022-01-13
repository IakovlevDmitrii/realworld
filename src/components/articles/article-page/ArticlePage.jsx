import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import realWorldApiService from '../../../service';

import Article from '../article';
import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";

import styles from './ArticlePage.module.scss';

const ArticlePage = ({ slug }) => {
   const [ hasError, setHasError ] = useState(false);
   const [ isLoading, setIsLoading ] = useState(true);
   const [ articleData, setArticleData ] = useState({});

   const loadArticle = useCallback(
      () => {
         setIsLoading(true);

         realWorldApiService
            .articles
            .get(slug)
            .then((data) => {
               setArticleData(data);
               setIsLoading(false);
            })
            .catch(() => {
               setHasError(true);
               setIsLoading(false);
            })
      },
      [ slug ]
   );

   useEffect(
      () => loadArticle(),
      [loadArticle]
   );

   if(isLoading) { return <Spinner /> }
   if(hasError) { return <ErrorIndicator /> }

   return (
      <section className={styles.section}>
         <div className={styles.container}>
            <Article articleData={articleData} isPreview={false} />
         </div>
      </section>
   )
};

ArticlePage.propTypes = {
   slug: PropTypes.string.isRequired,
};

const mapStateToProps = ({ article }) => ({
   slug: article.slug,
});

export default connect(
   mapStateToProps,
)(ArticlePage);
