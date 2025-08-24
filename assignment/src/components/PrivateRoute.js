import PropTypes from 'prop-types';

const PrivateRoute = ({ children, user }) => {
  if (!user) {
    return null; // This will be handled by App.js
  }
  
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object
};

export default PrivateRoute;
