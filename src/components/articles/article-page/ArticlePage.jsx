import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import realWorldApiService from '../../../service';
import articleCreators from '../../../store/action-creators';

import Article from '../article';
import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";

import styles from './ArticlePage.module.scss';

const ArticlePage = ({ article, deleteArticle }) => {

   const { slug } = article;

   const [ hasError, setHasError ] = useState(false);
   const [ isLoading, setIsLoading ] = useState(true);
   const [ articleData, setArticleData ] = useState({});

   // Если в store изменится или появится новый slug
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

   // после размонтирования удалим информацию о статье из store
   useEffect(() => (
      () => {deleteArticle()}
   ), [deleteArticle]);

   if(isLoading) {
      return <Spinner />
   }

   if(hasError) {
      return <ErrorIndicator />
   }

   return (
      <section className={styles.section}>
         <div className={styles.container}>
            <Article articleData={articleData} isPreview={false} />
         </div>
      </section>
   )
};

ArticlePage.propTypes = {
   article: PropTypes.shape({
      slug: PropTypes.string,

   }),
   deleteArticle: PropTypes.func.isRequired,
};

ArticlePage.defaultProps = {
   article: {
      slug: '',
   }
};

const mapStateToProps = ({ articleData }) => ({
   article: articleData.article
});

const mapDispatchToProps = {
   deleteArticle: articleCreators.articleData.deleteArticle,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ArticlePage);
