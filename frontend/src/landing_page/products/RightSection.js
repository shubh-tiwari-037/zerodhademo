import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-6 p-2 mt-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href={learnMore}>Learn More</a>
          </div>
        </div>
        <div className="col-6">
          <img src={imageURL} style={{width:"90%"}}/>
        </div>
      </div>
    </div>
  );
}

export default RightSection;
