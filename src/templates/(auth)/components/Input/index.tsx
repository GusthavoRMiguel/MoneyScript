import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Icon, Button } from 'semantic-ui-react';
import * as S from './style';

interface InputProps {
  name: string;
  label: string;
  required: boolean;
  type: string;
  icon?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type,
  required,
  icon,
  ...props
}) => {
  const nodeRef = React.useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const shouldShowAsText = type === 'password' && showPassword;

  return (
    <S.Container>
      <S.Content>
        <S.Label>
          {label || name} <span>{required && '*'}</span>
        </S.Label>
        <S.InputBox>
          <Field
            id={name}
            name={name}
            type={shouldShowAsText ? 'text' : type}
            {...props}
            className={type === 'password' ? 'fieldPass' : 'field'}
          />
          {icon && type === 'password' && (
            <Button
              ref={nodeRef}
              className="btn"
              type="button"
              icon
              onClick={togglePasswordVisibility}
            >
              <Icon name={showPassword ? 'eye slash' : 'eye'} />
            </Button>
          )}
        </S.InputBox>
        <S.ErrorBox>
          <ErrorMessage name={name} />
        </S.ErrorBox>
      </S.Content>
    </S.Container>
  );
};

export default Input;
