
import { forwardRef } from "react";
import ButtonRoot from "./ButtonRoot";

const Button = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => (
    <ButtonRoot
      {...rest}
      ref={ref}
      color="primary"
      variant={variant === "gradient" ? "contained" : variant}
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {children}
    </ButtonRoot>
  )
);

// Setting default values for the props of Button
Button.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "white",
  circular: false,
  iconOnly: false,
};

export default Button;
