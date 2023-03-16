import React from "react";
import { OBridgeStack, OBridgeInput, OBridgeLabel } from "./StyledOBridgeToggle";
import { OBridgeToggleProps, scales } from "./types";

const OBridgeToggle: React.FC<React.PropsWithChildren<OBridgeToggleProps>> = ({
  checked,
  scale = scales.LG,
  ...props
}) => (
  <OBridgeStack scale={scale}>
    <OBridgeInput id={props.id || "obridge-toggle"} scale={scale} type="checkbox" checked={checked} {...props} />
    <OBridgeLabel scale={scale} checked={checked} htmlFor={props.id || "obridge-toggle"}>
      <div className="obridges">
        <div className="obridge" />
        <div className="obridge" />
        <div className="obridge" />
        <div className="butter" />
      </div>
    </OBridgeLabel>
  </OBridgeStack>
);

export default OBridgeToggle;
