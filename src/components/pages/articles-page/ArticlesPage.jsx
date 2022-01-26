import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ArticlePage from '../article-page';
import ArticleList from '../../article-list';

const ArticlesPage = () => {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route path={`${match.path}/:slug`}>
            <ArticlePage />
         </Route>
         <Route path={match.path}>
            <ArticleList />
         </Route>
      </Switch>
   )
};

export default ArticlesPage;
