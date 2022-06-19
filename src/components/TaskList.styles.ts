import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    margin: auto;
    @media(max-width: 800px) {
        width: 100%;
    }
`;