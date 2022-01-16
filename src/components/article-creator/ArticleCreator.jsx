import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import styles from './ArticleCreator.module.scss';

const ArticleCreator = () => {
   const {
      watch,


      register,
      control,
      handleSubmit,
      formState: {
         errors
      }
   } = useForm({
      defaultValues: {
         tagList: [
            {value: ''},
         ]
      }
   });

   const { fields, remove, append } = useFieldArray({
      name: 'tagList',
      control,
   });

   const onSubmit = ({ title, description, body, tagList }) => {
      const article = { title, description, body, tagList };

      console.log('article', article);
   };

   console.log(watch("tagList"));

   return (
      <section className={styles.section}>
         <div className={styles.container}>
            <div className={styles.content}>
               <div className={styles.title}>
                  <h3>Create new article</h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.field}>
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
                  </div>
                  <div className={styles.field}>
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
                  </div>
                  <div className={styles.field}>
                     <label htmlFor='body'>Text</label>
                     <textarea
                        className={errors.body ? styles.error : ''}
                        rows={7}
                        placeholder='Text'
                        {...register('body', {
                           required: 'Text is required',
                        })} />
                     {errors.body && <span>{errors.body.message}</span>}
                  </div>
                  <div className={styles.field}>
                     <label htmlFor='tagList'>Tags</label>
                     <div className={styles.tags}>
                        <div className={styles.tagItemsContainer}>
                           {fields.map((field, index) => (
                              <div key={field.id} className={styles.tagItem}>
                                 <input
                                    type='text'
                                    placeholder='Tag'
                                    className={styles.tagInput}
                                    {...register(`tagList.${index}.value`)} />
                                 <button
                                    className={styles.deleteTagButton}
                                    onClick={() => remove(index)}
                                    type='button'>
                                    Delete
                                 </button>
                              </div>
                           ))}
                        </div>
                        <div className={styles.buttonContainer}>
                           <button
                              className={styles.addTagButton}
                              type="button"
                              onClick={() => {
                                 append({value: ''})}
                              } >
                              Add tag
                           </button>
                        </div>
                     </div>
                  </div>
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
