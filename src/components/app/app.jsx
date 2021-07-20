import React from 'react';
import ArticleList from "../article-list";
import styles from './styles/app.module.scss';

const { app } = styles;

const App = () => (
   <div className={app}>
      <ArticleList />
   </div>
);

export default App;
