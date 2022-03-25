import styled, { css } from 'styled-components'

interface IButtonProps {
  primary?: boolean
  color?: string
}

export const Button = styled.button`
  background-color: #d5d100;
  color: ${(props: IButtonProps) => props.color || 'black'};
  border: 1px solid grey;
  border-radius: 4px;
  padding: 0.6rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  cursor: pointer;
  transition: 0.25s transform ease-in-out;
  font-weight: bold;

  a {
    text-decoration: none;
    color: black;
  }

  :hover {
    transform: scale(1.05);
    transition: 0.25s transform ease-in-out;
  }

  ${(props: IButtonProps) =>
    props.primary &&
    css`
      background-color: #cac646;
      font-size: 1.2rem;
      border: 1px inset red;
    `}
`
