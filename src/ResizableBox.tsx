import React, { CSSProperties } from "react";
import { Rnd, Props as RndProps } from "react-rnd";

interface ResizableBoxProps extends RndProps {
  additionalCss?: CSSProperties;
  additionalChildren?: React.ReactNode;
}

/**
 * A resizable box component that can serve as the basis of further annotations.
 */
export const ResizableBox = (props: ResizableBoxProps) => {
  const { additionalCss, additionalChildren, ...rndProps } = props;
  return (
    <Rnd
      style={{
        zIndex: 1,
        ...(additionalCss || {}),
      }}
      {...rndProps}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {additionalChildren}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "10px",
                height: "10px",
                border: "2px solid black",
                borderRadius: "3px",
                marginTop: "-3px",
                marginLeft: "-3px",
              }}
            />
            <div
              style={{
                backgroundColor: "white",
                width: "10px",
                height: "10px",
                border: "2px solid black",
                borderRadius: "3px",
                marginTop: "-3px",
                marginRight: "-3px",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "10px",
                height: "10px",
                border: "2px solid black",
                borderRadius: "3px",
                marginBottom: "-3px",
                marginLeft: "-3px",
              }}
            />
            <div
              style={{
                backgroundColor: "white",
                width: "10px",
                height: "10px",
                border: "2px solid black",
                borderRadius: "3px",
                marginBottom: "-3px",
                marginRight: "-3px",
              }}
            />
          </div>
        </div>
      </div>
    </Rnd>
  );
};
