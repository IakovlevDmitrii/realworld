import React from "react";
import PropTypes from 'prop-types';
import styles from "./TagItem.module.scss";

const TagItem = ({ index, register }) => (
   <div className={styles.tagContainer}>
      <input
         type='text'
         placeholder='Tag'
         className={styles.tagInput}
         {...register(`tagList.${index}`)} />
      <button
         className={styles.deleteButton}
         type='button'>Delete</button>
   </div>
);

TagItem.propTypes = {
   index: PropTypes.number.isRequired,
   register: PropTypes.func.isRequired,
};

export default TagItem;