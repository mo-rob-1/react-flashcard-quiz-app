import { createGlobalStyle } from "styled-components";

export const lightMode = {
    body: '#f1f1f1',
    fontColor: '#000',
    card: '#fff',
    header: 'rgba(17, 17, 26, 0.1) 0px 1px 0px',
    card2: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    header2: '#fff',
    body2: 'all .5s ease',
    header3: 'all .5s ease',
    btn: 'linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%)',
    btnColor: '#fff'
}

export const darkMode = {
    body: '#0c0c0c',
    fontColor: '#fff',
    card: '#000',
    header: '#222 0px 1px 0px',
    card2: '#202020 0px 2px 8px 0px',
    header2: '#000',
    body2: 'all .5s ease',
    header3: 'all .5s ease',
    btn: 'linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%)',
}

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.body};
    }
    body {
        transition: ${(props) => props.theme.body2};
    }
    .card {
        background-color: ${(props) => props.theme.card};
    }
    .card {
        box-shadow: ${(props) => props.theme.card2};
    }
    .header {
        box-shadow: ${(props) => props.theme.header};
    }
    .header {
        background-color: ${(props) => props.theme.header2};
    }
    .header {
        transition: ${(props) => props.theme.header3};
    }
    .btn {
        background-image: ${(props) => props.theme.btn};
    }
    .btnColor {
        color: ${(props) => props.theme.btnColor};
    }
`;
