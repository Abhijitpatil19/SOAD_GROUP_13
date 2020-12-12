import React, { memo } from "react";

const BackdropDark = ({ backdropRef, alpha, click }) => {
  // backdrop style wrapper
  const backdropWrapper = {
    background: `rgba(0, 0, 0, ${alpha})`,
  };

  return (
    <div
      ref={backdropRef}
      style={backdropWrapper}
      onClick={click}
      className="backdrop_dark"
    ></div>
  );
};
export default memo(BackdropDark);
