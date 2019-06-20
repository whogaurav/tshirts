import React from "react";

export default function Layout(props) {
  return (
    <div className="container">
      {props.children}
      <div className="warning">Fumer Tue</div>
    </div>
  );
}
