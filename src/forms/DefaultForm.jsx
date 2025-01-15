import React from "react";

function DefaultForm() {
  return (
    <div
      className="crud-card"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <form
        className="crud-form"
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2>Welcome to the Content Management Section</h2>
        <p>
          Please click on any section, image, button, or element on the left
          side of the screen to open the corresponding form. Use the form to
          update the selected fields or manage the content as needed.
        </p>
      </form>
    </div>
  );
}

export default DefaultForm;
