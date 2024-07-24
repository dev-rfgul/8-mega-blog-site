import React from "react";

function Button(
    children,
    type = "button",
    bgColor = "bg-blue-500",
    textColor= "text-white",
    className="",
    ...props

) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>
      {children}
      // children is a placeholder for the content that will be passed to the Button component.its not mandatory that it should always be children it can be anything like text, hello, or xyz etc.
    </button>
  );
}

export default Button;
