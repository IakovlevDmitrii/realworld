import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import realWorldApiService from '../../../service';
import articleCreators from '../../../store/action-creators';

import Article from '../article';
import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";

import styles from './ArticlePage.module.scss';

const ArticlePage = ({ articleData, setArticle, clearArticleData }) => {
   const { article, isTheArticleNew } = articleData;
   const { slug } = article;

   const [ hasError, setHasError ] = useState(false);
   const [ isLoading, setIsLoading ] = useState(true);

   // Если в store появится slug
   const loadArticle = useCallback(() => {

      if (!isTheArticleNew) {
         setIsLoading(true);

         realWorldApiService
            .articles
            .getArticle(slug)
            .then((data) => {
               setArticle(data);
            })
            .catch(() => {
               setHasError(true);
            })
            .finally(() => {
               setIsLoading(false);
            })
      }
      },
      [slug, isTheArticleNew, setArticle]
   );

   useEffect(
      () => loadArticle(),
      [loadArticle]
   );

   // после размонтирования удалим информацию о статье из store
   useEffect(() => (
      () => {clearArticleData()}
   ), [clearArticleData]);

   if(isLoading) {
      return <Spinner />
   }

   if(hasError) {
      return <ErrorIndicator />
   }

   return (
      <section className={styles.section}>
         <div className={styles.container}>
            <Article content={article} />
         </div>
      </section>
   )
};

ArticlePage.propTypes = {
   articleData: PropTypes.shape({
      article: PropTypes.shape({
         author: PropTypes.shape({
            image: PropTypes.string,
            username: PropTypes.string
         }),
         createdAt: PropTypes.string,
         favorited: PropTypes.bool,
         favoritesCount: PropTypes.number,
         slug: PropTypes.string,
         tagList: PropTypes.arrayOf(PropTypes.string),
         title: PropTypes.string
      }),
      isTheArticleNew: PropTypes.bool.isRequired
   }),
   clearArticleData: PropTypes.func.isRequired,
   setArticle: PropTypes.func.isRequired,
};

ArticlePage.defaultProps = {
   articleData: {
      article: {
         author: {
            image: '',
            username: ''
         },
         body: '',
         createdAt: '',
         favorited: false,
         favoritesCount: 0,
         slug: '',
         tagList: [],
         title: ''
      }
   }
};

const mapStateToProps = ({ articleData }) => ({ articleData });

const mapDispatchToProps = {
   setArticle: articleCreators.articleData.setArticle,
   clearArticleData: articleCreators.articleData.clearArticleData,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ArticlePage);
