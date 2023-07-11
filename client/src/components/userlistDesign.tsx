import styled from "styled-components"


export const ListStyle = styled.li`
  list-style:none;
  margin: 0px;
`;

export const FlexStyle = styled.p`
  display: flex;
  align-items: center;
  margin: 0px;
`

export const IsMe = styled.p`
  margin: 15px;
  padding: 2px 32px 2px; 
  font-family: 'Noto Sans JP';
  width: 100px;
  align-items: center;
  border: 5px solid;
  border-color: var(--primary-color);
  background-color: var(--primary-color);
`;

export const CheckboxDesign = styled.input`
  border: 5px solid black;
  border-radius: 0px;
  width: 30px;
  height: 30px;
  margin: 4px;

`;

export const NotMe = styled.p`
  margin: 15px;
  padding: 2px 32px 2px; 
  font-family: 'Noto Sans JP';
  width: 100px;
  align-items: center;
  border: 5px solid;
  border-color: var(--primary-color);
  background-color: var(--background-color);
`
