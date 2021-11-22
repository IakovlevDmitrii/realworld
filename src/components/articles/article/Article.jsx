import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import styles from "./Article.module.scss";
import favoriteTrueImage from "./images/favorite-true.png";
import favoriteFalseImage from "./images/favorite-false.png";
import PersonDetails from "../../person-details";

const { content, articleInfo } = styles;

const Article = ({ articleData, slugChangedDispatch, isPreview }) => {
   const {
      author, body, createdAt, favorited, favoritesCount, slug, tagList, title
   } = articleData;

   const articleTitle = isPreview
      ? (
         <Link
            to={`/articles/:${slug}`}
            onClick={() => slugChangedDispatch(slug)}>
            <h2>{title}</h2>
         </Link> )
      : (
         <h2>{title}</h2> );

   const tags = tagList.map((tag) => (
      <div className={styles.tag} key={tag}>
         {tag}
      </div>
   ));

   return (
      <article className={content}>
         <div className={styles.article}>
            <div className={articleInfo}>
               <div className={styles.title}>
                  {articleTitle}
                  <div className={styles.favorites}>
                     <img
                        src={favorited ? favoriteTrueImage : favoriteFalseImage}
                        alt='like' />
                     <span className={styles.favoritesCount}>
                        {favoritesCount}
                     </span>
                  </div>
               </div>
               <div className={styles.tags}>
                  {tags}
               </div>
            </div>
            <div className={styles.body}>
               <p>{body}</p>
            </div>
         </div>
         <div className={styles.author}>
            <PersonDetails
               name={author.username}
               date={createdAt}
               src={author.image}
               alt="user's avatar" />
         </div>
      </article>
   )
};

Article.propTypes = {
   articleData: PropTypes.shape({
      author: PropTypes.shape({
         image: PropTypes.string.isRequired,
         username: PropTypes.string.isRequired,
      }).isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      favorited: PropTypes.bool.isRequired,
      favoritesCount: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
   }).isRequired,
   slugChangedDispatch: PropTypes.func.isRequired,
   isPreview: PropTypes.bool.isRequired,
};

export default Article;
