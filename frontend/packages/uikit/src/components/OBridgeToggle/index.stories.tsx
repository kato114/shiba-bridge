import React, { useState } from "react";
import OBridgeToggle from "./OBridgeToggle";

export default {
  title: "Components/OBridgeToggle",
  component: OBridgeToggle,
};

export const Default: React.FC<React.PropsWithChildren> = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = () => setIsChecked(!isChecked);

  return (
    <>
      <div style={{ marginBottom: "32px" }}>
        <OBridgeToggle checked={isChecked} onChange={toggle} />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <OBridgeToggle checked={isChecked} onChange={toggle} scale="md" />
      </div>
      <div>
        <OBridgeToggle checked={isChecked} onChange={toggle} scale="sm" />
      </div>
    </>
  );
};
