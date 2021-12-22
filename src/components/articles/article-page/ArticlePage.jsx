import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// import the service
import realWorldApiService from '../../../service';

// import components
import Article from '../article';
import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";

// import styles
import styles from './ArticlePage.module.scss';

const ArticlePage = ({ slug, slugChanged }) => {

   // to store an article data
   const [ article, setArticle ] = useState({});

   // to catch errors
   const [ hasError, setHasError ] = useState(false);

   // to render the loading indicator
   const [ isLoading, setIsLoading ] = useState(true);

   // when changing the slug
   const loadArticle = useCallback(
      () => {
         // to render the loading indicator
         setIsLoading(true);

         // article upload request
         realWorldApiService
            .Articles
            .get(slug)
            .then((data) => {
               // to save an article
               setArticle(data);

               // to stop the loading indicator
               setIsLoading(false);
            })
            .catch(() => {
               // to catch errors
               setHasError(true);

               // to stop the loading indicator
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
            <Article
               articleData={article}
               slugChanged={slugChanged}
               isPreview={false} />
         </div>
      </section>
   )
};

ArticlePage.propTypes = {
   slug: PropTypes.string.isRequired,
   slugChanged: PropTypes.func.isRequired
};

export default ArticlePage;
