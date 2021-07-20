import React from 'react';
import classNames from 'classnames';
import ArticleListItem from "../article-list-item";
import styles from './article-list.module.scss';

const {
   main,
   header,
   logo,
   logoTitle,
   sign,
   activeSign,
   articles,
} = styles;

const ArticleList = () => {

   const signClasses = classNames({
      [sign]: true,
      [activeSign]: false,
   });

   return (
      <div className={main}>
         <header className={header}>
            <a className={logo} href='#'>
               <h6 className={logoTitle}>Realworld blog</h6>
            </a>
            <button className={signClasses} type='button'>
               Sign In
            </button>
            <button className={signClasses} type='button'>
               Sign Up
            </button>
         </header>
         <ul className={articles}>
            <li>
               <ArticleListItem />
            </li>
            <li>
               <ArticleListItem />
            </li>
            <li>
               <ArticleListItem />
            </li>
            <li>
               <ArticleListItem />
            </li>
            <li>
               <ArticleListItem />
            </li>
            <li>
               <ArticleListItem />
            </li>
            <li>
               <ArticleListItem />
            </li>
            <li>
               <ArticleListItem />
            </li>
         </ul>
      </div>
   )
};

export default ArticleList;
