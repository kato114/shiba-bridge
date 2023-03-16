import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<React.PropsWithChildren<LogoProps>> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <div {...props}>
      <img src="/logo.png" width="60px" />
      <h1>ShibWallet</h1>
    </div>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
