import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components';
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

import { routes } from 'routes';
import useAuth from 'auth/useAuth';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

// contact form modal
import Modal from 'components/shared/Modal';
import ContactFormModal from 'pages/GlobalContactFormView/components/ContactFormModal';

// protected Route
import AdminRoute from 'auth/AdminRoute';
import UserRoute from 'auth/UserRoute';

// pages
import Login from 'pages/AuthLogin/Login';
import Signup from 'pages/AuthSignup/Signup';
import Home from 'pages/Home';
import AdminHomePage from 'pages/AdminHome/AdminHomePage';
import OffersPage from 'pages/UserOffersListPage/OffersPage';
import ResetPasswordPage from 'pages/AuthResetPassword/ResetPasswordPage';
import ResetPasswordSuccessPage from 'pages/AuthResetPassword/ResetPasswordSuccessPage';
import AdministrationPage from 'pages/AdminAdministration/AdministrationPage';
import SettingsPage from 'pages/GlobalSettingsPage/SettingsPage';
import ContactForm from 'pages/GlobalContactFormView/ContactForm';
import OfferDetailsPage from 'pages/UserOfferDetailsPage/OfferDetailsPage';

function App() {
  const [zoom, setZoom] = useState(1);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const changeZoom = value => {
    if (value > 0 && zoom > 1.5) return;
    if (value < 0 && zoom < 1) return;

    setZoom(prev => prev + value);
  };

  const Wrapper = styled.div`
    min-height: 100vh;
    zoom: ${({ zoom }) => zoom};
    /* filter: contrast(100%) invert(100%) brightness(1.1) sepia(0.4); */
  `;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path={routes.login} component={Login} />
          <Route exact path={routes.signup} component={Signup} />
          <Route
            exact
            path={routes.resetPassword}
            component={ResetPasswordPage}
          />
          <Route
            exact
            path={routes.resetPasswordSuccess}
            component={ResetPasswordSuccessPage}
          />
          <Wrapper className='App' zoom={zoom}>
            <Header changeZoom={changeZoom} />
            <Route
              exact
              path={routes.home}
              render={props => (
                <Home setContactModalOpen={setContactModalOpen} {...props} />
              )}
            />
            <Route exact path={routes.contactForm} component={ContactForm} />

            {/* ADMIN routes */}
            <AdminRoute exact path={routes.admin.home} component={AdminHomePage} />
            
            <AdminRoute
              exact
              path={routes.admin.administration}
              component={AdministrationPage}
            />
            <AdminRoute
              exact
              path={routes.admin.settings}
              component={SettingsPage}
            />

            {/* USER routes */}
            <UserRoute exact path={routes.user.home} component={OffersPage} />

            <UserRoute
              exact
              path={routes.user.settings}
              component={SettingsPage}
            />

            <UserRoute 
              exact path = {routes.user.offer}
              component = {OfferDetailsPage}
            />
            <Footer setModalOpen={setContactModalOpen} />

            <Modal open={isContactModalOpen} setOpen={setContactModalOpen}>
              <ContactFormModal
                isModalOpen={isContactModalOpen}
                setOpen={setContactModalOpen}
              />
            </Modal>
          </Wrapper>
        </Switch>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
