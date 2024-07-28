import React from "react";

function Message({ text, owner }) {
  return (
    <div className="w-100 d-flex">
      <div
        className={`${
          owner ? "bgPrimary ms-auto" : "bgSecondary"
        } p-3 my-3 rounded d-inline-block`}
        style={{ maxWidth: "50%" }}
      >
        <h5 className="text-white">{text}</h5>
      </div>
    </div>
  );
}

export default Message;
