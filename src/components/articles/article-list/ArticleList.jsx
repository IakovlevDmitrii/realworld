import React, { useState, useEffect, useCallback } from 'react';
import { Pagination } from 'antd';

import Article from '../article';
import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";

import realWorldApiService from '../../../service';

import 'antd/dist/antd.css';
import './pagination.css';
import styles from './ArticleList.module.scss';

const ArticleList = () => {
   const [ page, setPage ] = useState(1);
   const [ count, setCount ] = useState(0);
   const [ hasError, setHasError ] = useState(false);
   const [ isLoading, setIsLoading ] = useState(true);
   const [ articleList, setArticleList ] = useState([]);

   const loadArticleList = useCallback( () => {
         setIsLoading(true);

         realWorldApiService
            .articles
            .all(page)
            .then( ({ articles, articlesCount }) => {
               setArticleList(articles);
               setCount(articlesCount);
            })
            .catch( () => {
               setHasError(true);
            })
            .finally(() => {
               setIsLoading(false);
            })
      },
      [ page ]
   );

   useEffect(
      () => loadArticleList(),
      [loadArticleList]
   );

   if(isLoading) {
      return <Spinner />
   }

   if(hasError) {
      return <ErrorIndicator />
   }

   const listToShow = articleList.map((article) => (
      <Article
         content={article}
         isPreview
         key={article.slug}
      />
   ));

   return (
      <section>
         <div className={styles.container}>
            <div className={styles.content}>
               {listToShow}
               <Pagination
                  current={page}
                  onChange={(pageNumber) => setPage(pageNumber)}
                  total={count}
                  hideOnSinglePage
                  pageSize="5"
                  size="small"
                  showSizeChanger={false}
                  className={styles.pagination}
               />
            </div>
         </div>
      </section>
   )
};

export default ArticleList;
