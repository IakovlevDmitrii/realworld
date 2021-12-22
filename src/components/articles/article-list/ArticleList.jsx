import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Pagination } from 'antd';

// import components
import Article from '../article';
import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";

// import the service
import realWorldApiService from '../../../service';

// import styles
import 'antd/dist/antd.css';
import './pagination.css';
import styles from './ArticleList.module.scss';

const { section, pagination } = styles;

const ArticleList = ({ slugChanged }) => {

   // articles page number
   const [ page, setPage ] = useState(1);

   // number of articles
   const [ count, setCount ] = useState(0);

   // to catch errors
   const [ hasError, setHasError ] = useState(false);

   // to render the loading indicator
   const [ isLoading, setIsLoading ] = useState(true);

   // to store a list of articles
   const [ articleList, setArticleList ] = useState([]);

   // when changing the page number of articles
   const loadArticleList = useCallback(
      () => {
         // to render the loading indicator
         setIsLoading(true);

         // articles upload request
         realWorldApiService
            .Articles
            .all(page)
            .then( ({ articles, articlesCount }) => {
               // to save a list of articles
               setArticleList(articles);

               // to save a number of articles
               setCount(articlesCount);

               // to stop the loading indicator
               setIsLoading(false);
            })
            .catch( () => {
               // to catch errors
               setHasError(true);

               // to stop the loading indicator
               setIsLoading(false);
            });
      },
      [ page ]
   );

   useEffect(() => loadArticleList(), [loadArticleList]);

   if(isLoading) { return <Spinner /> }
   if(hasError) { return <ErrorIndicator /> }

   const listToShow = articleList.map((articleData) => (
      <li key={articleData.slug} className={styles.item}>
         <Article
            articleData={articleData}
            slugChanged={slugChanged}
            isPreview />
      </li>
   ));

   return (
      <section className={section}>
         <div className={styles.container}>
            <div className={styles.content}>
               <ul className={styles.list}>
                  {listToShow}
               </ul>
               <Pagination
                  current={page}
                  onChange={(pageNumber) => setPage(pageNumber)}
                  total={count}
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
   slugChanged: PropTypes.func.isRequired
};

export default ArticleList;
