import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import realWorldApiService from '../../../service';

import Article from '../../article';
import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";

import styles from './ArticlePage.module.scss';

const ArticlePage = () => {
   const { slug } = useParams();

   const [ article, setArticle ] = useState({});
   const [ hasError, setHasError ] = useState(false);
   const [ isLoading, setIsLoading ] = useState(true);

   const loadArticle = useCallback(() => {

         realWorldApiService
            .articles
            .getArticle(slug)
            .then((content) => {
               setArticle(content);
            })
            .catch(() => {
               setHasError(true);
            })
            .finally(() => {
               setIsLoading(false);
            })
      },
      [slug, setArticle]
   );

   useEffect(
      () => loadArticle(),
      [loadArticle]
   );

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

export default ArticlePage;
