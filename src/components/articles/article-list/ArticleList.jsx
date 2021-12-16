import React, { useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";
import Article from '../article';

import realWorldApiService from '../../../service';
import { articleActions, articleListActions } from '../../../store/actions';

import 'antd/dist/antd.css';
import './styles/pagination.css';
import styles from './styles/ArticleList.module.scss';

const { slugChanged } = articleActions;
const { listLoading, listLoaded, listHasError, listPageChanged } = articleListActions;
const { section, container, content, list, item, pagination } = styles;

const ArticleList = ({
   articleList,
   loadingDispatch,
   loadedDispatch,
   hasErrorDispatch,
   pageChangedDispatch,
   slugChangedDispatch
}) => {

   const {
      isLoading, hasError, articles, articlesCount, articleListPage
   } = articleList;

   const loadArticleList = useCallback(
      () => {
         loadingDispatch();

         realWorldApiService
            .Articles.all(articleListPage)
            .then((data) => ( loadedDispatch(data) ))
            .catch( () => hasErrorDispatch() )
      },
      [ loadingDispatch, articleListPage, loadedDispatch, hasErrorDispatch ]
   );

   useEffect(
      () => loadArticleList(),
      [loadArticleList]
   );

   const onPageChange = (page) => {
      pageChangedDispatch(page)
   };

   if(isLoading) { return <Spinner /> }
   if(hasError) { return <ErrorIndicator /> }

   const listToShow = articles.map((articleData) => (
      <li key={articleData.slug} className={item}>
         <Article
            articleData={articleData}
            slugChangedDispatch={slugChangedDispatch}
            isPreview />
      </li>
   ));

   return (
      <section className={section}>
         <div className={container}>
            <div className={content}>
               <ul className={list}>
                  {listToShow}
               </ul>
               <Pagination
                  current={articleListPage}
                  onChange={onPageChange}
                  total={articlesCount}
                  hideOnSinglePage
                  pageSize="5"
                  size="small"
                  showSizeChanger={false}
                  className={pagination}
               />
            </div>
         </div>
      </section>
   )
};

ArticleList.propTypes = {
   articleList: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      hasError: PropTypes.bool.isRequired,
      articles: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
      articlesCount: PropTypes.number.isRequired,
      articleListPage: PropTypes.number.isRequired,
   }).isRequired,
   loadingDispatch: PropTypes.func.isRequired,
   loadedDispatch: PropTypes.func.isRequired,
   hasErrorDispatch: PropTypes.func.isRequired,
   pageChangedDispatch: PropTypes.func.isRequired,
   slugChangedDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ articleList }) => ({ articleList });

const mapDispatchToProps = {
   loadingDispatch: listLoading,
   loadedDispatch: listLoaded,
   hasErrorDispatch: listHasError,
   pageChangedDispatch: listPageChanged,
   slugChangedDispatch: slugChanged
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ArticleList);
