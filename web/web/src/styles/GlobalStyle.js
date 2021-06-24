import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
    /*temporary helper
    uncomment to see borders of every HTML element on the website, helps with positioning*/
    /* border: 1px blue solid;  */
    }

    *, *:before, *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    body, html {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    h1, h2, h3, h4 {
        font-family: 'Libre Franklin', sans-serif;
    }

    .ql-align-center {
        text-align: center;
    }
    
    body {
      background-color: ${({ theme }) => theme.background};
    }
`;

export default GlobalStyle;
