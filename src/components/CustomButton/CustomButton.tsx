import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const CustomButton = ({ children, onClick }: CustomButtonProps) => {
  const buttonStyle = {
    backgroundColor: "var(--button-bg)",
    ":hover": {
      backgroundColor: "var(--button-bg-hover)",
    },
    color: "var(--button-text)",
    fontSize: "12px",
    margin: "10px",
    padding: "6px 12px",
    minWidth: "auto",
  };
  return (
    <Button sx={buttonStyle} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CustomButton;
