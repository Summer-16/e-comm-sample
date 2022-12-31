
import { forwardRef } from "react";
import TypographyRoot from "./TypographyRoot";
import { useECommController } from "../../context";

const Typography = forwardRef(
  (
    { color, fontWeight, textTransform, verticalAlign, textGradient, opacity, children, ...rest },
    ref
  ) => {
    const [controller] = useECommController();
    const { darkMode } = controller;

    return (
      <TypographyRoot
        {...rest}
        ref={ref}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          darkMode,
        }}
      >
        {children}
      </TypographyRoot>
    );
  }
);

// Setting default values for the props of Typography
Typography.defaultProps = {
  color: "dark",
  fontWeight: false,
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
};

export default Typography;
