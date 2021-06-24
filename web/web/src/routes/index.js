export const routes = {
  login: '/login/:token?',
  signup: '/signup',
  resetPassword: '/reset-password',
  resetPasswordSuccess: '/reset-success',

  home: '/',
  jobOffer: '/job-offer/:id',
  contactForm: '/contact-form',
  printAdv: '/print-adv/:id',

  admin: {
    home: '/admin',
    administration: '/admin/administration',
    settings: '/admin/settings',
  },

  user: {
    home: '/user/offers',
    settings: '/user/settings',
    offer: '/user/offer/:id'
  },
};
