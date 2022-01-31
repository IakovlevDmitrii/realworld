import React from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import PersonDetails from "../person-details";

import favoriteTrueImage from "./images/favorite-true.png";
import favoriteFalseImage from "./images/favorite-false.png";
import styles from "./Article.module.scss";

const Article = ({ content }) => {
   const {
      author, body, createdAt, description, favorited, favoritesCount, tagList, title
   } = content;

   const { url } = useRouteMatch();

   const tags = tagList.map((tag) => (
      <div className={styles.tag} key={tag}>
         {tag}
      </div>
   ));

   return (
      <article className={styles.content}>
         <div className={styles.article}>
            <div className={styles.info}>
               <div className={styles.title}>
                  <h2>{title}</h2>
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
            <div className={styles.description}>
               <p>{description}</p>
            </div>
         </div>
         <div className={styles.body}>
            <ReactMarkdown>
               {body}
            </ReactMarkdown>
         </div>
         <div className={styles.author}>
            <PersonDetails
               name={author.username}
               date={createdAt}
               src={author.image}
               alt="user's avatar" />
            <div className={styles.buttons}>
               <button
                  className={styles.deleteArticleButton}
                  onClick={() => console.log('delete')}
                  type='button'>
                  Delete
               </button>
               <Link to={`${url}/edit`}>
                  <button
                     className={styles.editArticleButton}
                     type='button'>
                     Edit
                  </button>
               </Link>
            </div>
         </div>
      </article>
   )
};

Article.propTypes = {
   content: PropTypes.shape({
      author: PropTypes.shape({
         image: PropTypes.string.isRequired,
         username: PropTypes.string.isRequired,
      }).isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      favorited: PropTypes.bool.isRequired,
      favoritesCount: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
   }).isRequired
};

export default Article;