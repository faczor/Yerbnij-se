import { Button } from '../../components/atoms/Buttons';
import googleLogo from '../../assets/google-logo.png';
import fbLogo from '../../assets/fb-logo.png';
import styled from 'styled-components';

const LinkStyled = styled.a`
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: black;
  text-transform: uppercase;
  letter-spacing: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100%;
  }

  span {
    margin-left: 20px;
  }
`;

const SocialLogin = ({
                       GOOGLE_AUTH_URL,
                       FACEBOOK_AUTH_URL,
                       buttonProps,
                       customList,
                       fontSize,
                     }) => {
  const list = customList || [
    {
      name: 'google',
      img: googleLogo,
      title: 'Log in with Google',
      url: GOOGLE_AUTH_URL,
    },
    {
      name: 'facebook',
      img: fbLogo,
      title: 'Log in with Facebook',
      url: FACEBOOK_AUTH_URL,
    },
  ];

  const buttonList = list.map(el => (
    <Button key={el.name} width='100%' height='50px' {...buttonProps}>
      <LinkStyled href={el.url}>
        <img src={el.img} alt={`logo ${el.name}`} />
        <span style={{ fontSize }}>{el.title}</span>
      </LinkStyled>
    </Button>
  ));

  // eslint-disable-next-line react/jsx-fragments
  return ({ buttonList });
};

export default SocialLogin;
