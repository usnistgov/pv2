import React from "react";
import './Button.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div className="button-wrapper" data-testid="button" onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;
