import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { role } from 'auth/constans';
import { routes } from 'routes';
import useAuth from 'auth/useAuth';
import Indicator from 'components/atoms/Indicator';

const Home = () => {
  const { user } = useSelector(state => state.auth);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (!user) {
    return <Redirect to='/login' />;
  }

  if (user.role === role.user) {
    return <Redirect to={routes.user.home} />;
  }

  if (user.role === role.admin) {
    return <Redirect to={routes.admin.home} />;
  }

  return <Indicator />;
};
export default Home;
