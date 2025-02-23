import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  const buttonStyle = {
    backgroundColor: "#4983db",
    ":hover": {
      backgroundColor: "#125ea6",
    },
    color: "white",
    fontSize: "12px",
    margin: "10px",
    padding: "6px 12px",
    minWidth: "auto",
  };

  return (
    <Button variant="contained" sx={buttonStyle} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
