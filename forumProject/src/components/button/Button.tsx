import { Button as ChakraButton } from '@chakra-ui/react';
import { MouseEventHandler, ReactNode } from 'react';

const variants = {
  solid: {
    color: 'white',
    bg: 'blue.500',
    _hover: {
      bg: 'blue.400',
    },
  },
  outline: {
    color: 'blue.500',
    border: '1px solid',
    borderColor: 'blue.500',
    bg: 'white',
  },
  oauth: {
    height: '34px',
    border: '1px solid',
    borderColor: 'gray.300',
    _hover: {
      bg: 'gray.50',
    },
  },
  baseStyle: {
    borderRadius: '60px',
    fontSize: '10pt',
    fontWeight: 700,
    _focus: {
      boxShadow: 'none',
    },
  },
  sizes: {
    sm: {
      fontSize: '8pt',
    },
    md: {
      fontSize: '10pt',
      // height: "28px",
    },
  },
};
export type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: keyof typeof variants;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
};
export const Button = ({
  variant = 'solid',
  type = 'button',
  children,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <ChakraButton {...props} {...variants[variant]} type={type} leftIcon={icon}>
      {children}
    </ChakraButton>
  );
};
