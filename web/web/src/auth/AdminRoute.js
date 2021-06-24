import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { role } from './constans';
import Indicator from 'components/atoms/Indicator';

const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth);

  if (auth.isAuthenticated === null) {
    return <Indicator />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        !auth.user || !auth.isAuthenticated ? (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        ) : auth.isAuthenticated &&
          (auth.user.role === role.admin ) ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
