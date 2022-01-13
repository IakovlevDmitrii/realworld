// поле нового тега - статический инпут в интерфейсе.
// а вот инпуты с уже существующими - динамические,
// которые рендерятся по стейту

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import TagItem from './tag-item';
import styles from './ArticleCreator.module.scss';

const ArticleCreator = () => {
   const [ tagNames, setTagNames ] = useState(['']);

   const {
      register,
      handleSubmit,
      getValues,
      formState: {
         errors
      },
   } = useForm();

   const tagItemsFromState = (
      tagNames.map((tagName, index) => (
         <TagItem
            index={index}
            register={register}
            key={tagName} />
      ))
   );

   const addTagItem = () => {
      const tags = getValues('tagList');
      tags.push('');
      setTagNames([
         ...getValues('tagList'),
         ]
      );
   };

   const onSubmit = ({ title, description, body, tagList }) => {
      const article = { title, description, body, tagList };

      console.log('article', article);
   };

   return (
      <section className={styles.section}>
         <div className={styles.container}>
            <div className={styles.content}>
               <div className={styles.title}>
                  <h3>Create new article</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                     <label htmlFor='title'>Title</label>
                     <input
                        className={errors.title ? styles.error : ''}
                        placeholder='Title'
                        type='text'
                        {...register('title', {
                           required: 'Title is required',
                        })}
                     />
                     {errors.title && <span>{errors.title.message}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='description'>Short description</label>
                     <input
                        className={errors.description ? styles.error : ''}
                        placeholder='Title'
                        type='text'
                        {...register('description', {
                           required: 'Description is required',
                        })}
                     />
                     {errors.description && <span>{errors.description.message}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='body'>Text</label>
                     <textarea
                        className={errors.body ? styles.error : ''}
                        rows={7}
                        placeholder='Text'
                        {...register('body', {
                           required: 'Text is required',
                        })} />
                     {errors.body && <span>{errors.body.message}</span>}
                  </fieldset>
                  <fieldset>
                     <label htmlFor='tagList'>Tags</label>
                     <div className={styles.tags}>
                        <div className={styles.tagItemsContainer}>
                           {tagItemsFromState}
                        </div>
                        <div className={styles.buttonContainer}>
                           <button
                              className={styles.button}
                              onClick={addTagItem}
                              type='button' >
                              Add tag
                           </button>
                        </div>
                     </div>
                  </fieldset>
                  <button
                     className={styles.formButton}
                     type='submit'>
                     Send
                  </button>
               </form>
            </div>
         </div>
      </section>
   )
};

export default ArticleCreator;

//                            <TagItem
//                               index={tagCounter}
//                               register={register}
//                               key={tagCounter} />