import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from 'classnames';

// import styles
import src from './image/User.png';
import styles from './Header.module.scss';

const {
   authButton,
   authButtonActive,
   personInfo,
   personName,
   personImage
} = styles;

const link = classNames({
   [authButton]: true,
   [authButtonActive]: false
});

const Header = ({ auth }) => {
   const clearLocalStorage = () => {
      window.localStorage.clear();
   };

   const getLinksToShow = () => {
      const { isLoggedIn } = auth;

      if(isLoggedIn) {
         const { user } = auth;

         return (
             <>
               <Link to='/sign-up' className={styles.articleButton}>Create article</Link>
               <Link to='/profile' className={styles.person}>
                  <div className={personInfo}>
                     <div className={personName}>{user.username}</div>
                  </div>
                  <div className={personImage}>
                     <img src={user.image || src} alt="user's avatar" />
                  </div>
               </Link>
               <button
                  type='button'
                  className={link}
                  onClick={clearLocalStorage}>Log Out</button>
            </>
         )
      }

      return (
         <>
            <Link to='/sign-in' className={link}>
               Sign In
            </Link>
            <Link to='/sign-up' className={link}>
               Sign Up
            </Link>
         </>
      )
   };

   return (
      <header className={styles.header}>
         <div className={styles.container}>
            <div className={styles.content}>
               <Link to='/articles' className={styles.logo}>Realworld blog</Link>
               {getLinksToShow()}
            </div>
         </div>
      </header>
   )
};

Header.propTypes = {
   auth: PropTypes.shape({
      user: PropTypes.shape({
         username: PropTypes.string,
         image: PropTypes.string,
      }),
      isLoggedIn: PropTypes.bool.isRequired,
   }),
};

Header.defaultProps = {
   auth: {
      user: {
         username: '',
         image: '',
      }
   }
};

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps)(Header);
