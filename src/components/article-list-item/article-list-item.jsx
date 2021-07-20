import React from 'react';
import styles from './article-list-item.module.scss';
import heartSource from './images/heart.png';
import photoSource from './images/photo.png';

const {
   main,
   article,
   title,
   likes,
   likesCounter,
   tags,
   tag,
   text,
   author,
   authorInfo,
   authorName,
   date,
   authorPhoto,
} = styles;

const ArticleListItem = () => (
   <div className={main}>
      <div className={article}>
         <div className={title}>
            <h5>Some article title</h5>
            <div className={likes}>
               <img
                  src={heartSource}
                  alt='like' />
               <span className={likesCounter}>12</span>
            </div>
         </div>
         <div className={tags}>
            <div className={tag}>
               Tag1
            </div>
            <div className={tag}>
               Tag1
            </div>
         </div>
         <div className={text}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
         </div>
      </div>
      <div className={author}>
         <div className={authorInfo}>
            <p className={authorName}>John Doe</p>
            <span className={date}>date</span>
         </div>
         <div className={authorPhoto}>
            <img
               src={photoSource}
               alt='userPhoto' />
         </div>
      </div>
   </div>
);

export default ArticleListItem;
