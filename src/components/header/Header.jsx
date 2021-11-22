import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PersonDetails from "../person-details";
import styles from './Header.module.scss';

const {
   header, container, content, logo, articleButton, authButton, authButtonActive,
} = styles;

const auth = classNames({
   [authButton]: true,
   [authButtonActive]: false,
});

const Header = ({ user }) => {
   const { isAuthenticated, imageSrc } = user;

   const linksToShow = isAuthenticated ? (
      <>
         <Link to='/sign-up' className={articleButton}>Create article</Link>
         <Link to='/sign-up'>
            <PersonDetails name='John Doe' src={imageSrc} alt="user's avatar" />
         </Link>
         <Link to='/sign-up' className={auth}>Log Out</Link>
      </> ) : (
      <>
         <Link to='/sign-in' className={auth}>Sign In</Link>
         <Link to='/sign-up' className={auth}>Sign Up</Link>
      </>
   );

   return (
      <header className={header}>
         <div className={container}>
            <div className={content}>
               <Link to='/articles' className={logo}>Realworld blog</Link>
               {linksToShow}
            </div>
         </div>
      </header>
   )
};

Header.propTypes = {
   user: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
   }).isRequired,
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Header);
