
import { forwardRef } from "react";
import InputRoot from "./InputRoot";
import { useECommController } from "../../context";

const Input = forwardRef(({ size, error, success, disabled, ...rest }, ref) => {
  const [controller] = useECommController();
  const { darkMode } = controller;

  return (
    <InputRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled, darkMode }} />
  );
});

// Setting default values for the props of Input
Input.defaultProps = {
  size: "medium",
  error: false,
  success: false,
  disabled: false,
};

export default Input;
