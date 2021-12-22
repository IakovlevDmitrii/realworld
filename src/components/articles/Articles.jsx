import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";

import ArticleList from "./article-list/ArticleList";
import ArticlePage from "./article-page/ArticlePage";

const Articles = () => {
   const { path } = useRouteMatch();
   const [ slug, setSlug ] = useState('');

   return (
      <Switch>
         <Route path={path} exact>
            <ArticleList slugChanged={setSlug} />
         </Route>
         <Route path={`${path}/:slug`}>
            <ArticlePage slug={slug} slugChanged={setSlug} />
         </Route>
      </Switch>
   )
};

export default Articles;
