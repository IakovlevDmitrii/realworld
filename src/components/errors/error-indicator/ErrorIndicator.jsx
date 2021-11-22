import React from 'react';
import styles from './error-indicator.module.scss';

const { errorIndicator, container, content, title } = styles;

const ErrorIndicator = () => (
   <section className={errorIndicator}>
      <div className={container}>
         <div className={content}>
            <div className={title}>
               <span>Ошибка при получении данных с сервера</span>
            </div>
         </div>
      </div>
   </section>
);

export default ErrorIndicator;