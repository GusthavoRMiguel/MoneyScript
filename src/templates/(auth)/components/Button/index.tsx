import React from 'react';
import { Container } from './style';

interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  secondary,
  type,
  disabled,
  onClick,
  ...props
}) => {
  const nodeRef = React.useRef(null);
  return (
    <Container
      ref={nodeRef}
      type={type}
      {...props}
      disabled={disabled}
      className={secondary ? 'secondary' : ''}
    >
      {text}
    </Container>
  );
};

export default Button;
