import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import realWorldApiService from '../../../service';
import articleCreators from '../../../store/action-creators';

import Article from '../article';
import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";

import styles from './ArticlePage.module.scss';

const ArticlePage = ({ slug, deleteArticle }) => {
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
            })
            .catch(() => {
               setHasError(true);
            })
            .finally(() => {
               setIsLoading(false);
            })
      },
      [slug]
   );

   useEffect(
      () => loadArticle(),
      [loadArticle]
   );

   useEffect(() => (
      () => {deleteArticle()}
   ), [deleteArticle]);

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
   deleteArticle: PropTypes.func.isRequired,
};

const mapStateToProps = ({ article }) => ({
   slug: article.slug,
});

const mapDispatchToProps = {
   deleteArticle: articleCreators.article.deleteArticle,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ArticlePage);
