import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import PersonDetails from "../person-details";

import actionCreators from '../../../store/action-creators';

import favoriteTrueImage from "./images/favorite-true.png";
import favoriteFalseImage from "./images/favorite-false.png";
import styles from "./Article.module.scss";

const Article = ({ content, isPreview, setSlug }) => {
   const {
      author, createdAt, description, favorited, favoritesCount, slug, tagList, title
   } = content;

   const articleTitle = isPreview
      ? (
         <Link
            to={`/articles/:${slug}`}
            onClick={() => setSlug(slug)} >
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
      <article className={styles.content}>
         <div className={styles.article}>
            <div className={styles.info}>
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
               <p>{description}</p>
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
   content: PropTypes.shape({
      author: PropTypes.shape({
         image: PropTypes.string.isRequired,
         username: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      favorited: PropTypes.bool.isRequired,
      favoritesCount: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
   }).isRequired,
   setSlug: PropTypes.func.isRequired,
   isPreview: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
   setSlug: actionCreators.articleData.setSlug,
};

export default connect(
   null,
   mapDispatchToProps
)(Article);