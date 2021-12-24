import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

// import action creators
import { authActions } from '../../store/actions';

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

const { logOut } = authActions;

const Header = ({ auth, logOutDispatch }) => {

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
                  className={authButton}
                  onClick={logOutDispatch}>Log Out</button>
            </>
         )
      }

      return (
         <>
            <NavLink
               to="/sign-in"
               className={authButton}
               activeClassName={authButtonActive}>
               Sign In
            </NavLink>
            <NavLink
               to="/sign-up"
               className={authButton}
               activeClassName={authButtonActive}>
               Sign Up
            </NavLink>
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
   logOutDispatch: PropTypes.func.isRequired,
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
const mapDispatchToProps = {
   logOutDispatch: logOut,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Header);
