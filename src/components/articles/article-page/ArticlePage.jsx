import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import realWorldApiService from '../../../service';
import { articleActions } from "../../../store/actions";

import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";
import Article from '../article';

import styles from './ArticlePage.module.scss';

const { Articles } = realWorldApiService;
const {
   slugChanged,
   articleLoading,
   articleLoaded,
   articleHasError
} = articleActions;
const { section, container } = styles;

const ArticlePage = ({
   articlePage,
   loadingDispatch,
   loadedDispatch,
   hasErrorDispatch,
   slugChangedDispatch
}) => {

   const { isLoading, hasError, article } = articlePage;
   const { slug } = article;

   const loadArticle = useCallback(
      () => {
         loadingDispatch();

         Articles.get(slug)
            .then((data) => loadedDispatch(data))
            .catch(() => hasErrorDispatch())
      },
      [ slug, loadingDispatch, loadedDispatch, hasErrorDispatch ]
   );

   useEffect(
      () => loadArticle(),
      [loadArticle]
   );

   if(isLoading) { return <Spinner /> }
   if(hasError) { return <ErrorIndicator /> }

   return (
      <section className={section}>
         <div className={container}>
            <Article
               articleData={article}
               slugChangedDispatch={slugChangedDispatch}
               isPreview={false}
            />
         </div>
      </section>
   )
};

ArticlePage.propTypes = {
   articlePage: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      hasError: PropTypes.bool.isRequired,
      article: PropTypes.oneOfType([
         PropTypes.bool,
         PropTypes.shape({
            author: PropTypes.objectOf(PropTypes.string),
            body: PropTypes.string,
            createdAt: PropTypes.string,
            favorited: PropTypes.bool,
            favoritesCount: PropTypes.number,
            slug: PropTypes.string.isRequired,
            tagList: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string
         })
      ])
   }).isRequired,
   loadingDispatch: PropTypes.func.isRequired,
   loadedDispatch: PropTypes.func.isRequired,
   hasErrorDispatch: PropTypes.func.isRequired,
   slugChangedDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ articlePage }) => ({ articlePage });

const mapDispatchToProps = {
   loadingDispatch: articleLoading,
   loadedDispatch: articleLoaded,
   hasErrorDispatch: articleHasError,
   slugChangedDispatch: slugChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
