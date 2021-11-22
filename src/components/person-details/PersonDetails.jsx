import React from 'react';
import PropTypes from 'prop-types';
import styles from "./PersonDetails.module.scss";

const { person, personInfo, personName, personImage } = styles;

const PersonDetails = ({ name, date, src, alt }) => (
   <div className={person}>
      <div className={personInfo}>
         <div className={personName}>{name}</div>
         {date && (<span>{date}</span>)}
      </div>
      <div className={personImage}>
         <img src={src} alt={alt} />
      </div>
   </div>
);

PersonDetails.propTypes = {
   name: PropTypes.string.isRequired,
   date: PropTypes.string,
   src: PropTypes.string.isRequired,
   alt: PropTypes.string.isRequired,
};

PersonDetails.defaultProps = {
   date: '',
};

export default PersonDetails;
