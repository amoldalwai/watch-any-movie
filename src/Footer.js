import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <div className="navbar fixed-bottom  justify-content-center">
        <span
          style={{
            background: "#1f1e1e",
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingTop: "12px",
            paddingBottom: "12px",
            color: "gray",
            borderRadius: "5px",
            fontSize: "15px",
            width: "250px",
            textAlign: "center",
          }}
        >
          Developed by <span style={{ color: "red" }}>Amol Dalwai</span>
        </span>
      </div>
    </>
  );
};
export default Footer;
