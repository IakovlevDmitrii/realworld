import React from "react";
import PropTypes from 'prop-types';
import styles from "./TagItem.module.scss";

const TagItem = ({ index, register }) => (
   <div className={styles.container}>
      <input
         type='text'
         placeholder='Tag'
         className={styles.input}
         {...register(`tagList.${index}`)} />
      <button
         className={styles.button}
         type='button'>
         Delete
      </button>
   </div>
);

TagItem.propTypes = {
   index: PropTypes.number.isRequired,
   register: PropTypes.func.isRequired,
};

export default TagItem;
