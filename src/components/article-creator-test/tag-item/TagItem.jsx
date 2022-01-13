import React from "react";
import PropTypes from 'prop-types';
import styles from "./TagItem.module.scss";

const TagItem = ({ index, register, onClick }) => (
   <div className={styles.container}>
      <input
         type='text'
         placeholder='Tag'
         className={styles.input}
         {...register(`tagList.${index}.value`)}
      />
      <button
         className={styles.button}
         onClick={onClick}
         type='button'>
         Delete
      </button>
   </div>
);

TagItem.propTypes = {
   index: PropTypes.number.isRequired,
   register: PropTypes.func.isRequired,
   onClick: PropTypes.func.isRequired,
};

export default TagItem;
