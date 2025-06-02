import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Button = (
  props: {
    variant: "primary" | "secondary" | "text";
    iconAfter?: ReactNode;
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { className, children, variant, iconAfter, ...rest } = props;

  return (
    <button
      className={twMerge(
        " px-6 py-2 rounded-xl border border-black  inline-flex items-center gap-2",
        variant === "primary" && "bg-blue-950 text-white uppercase",
        variant === "secondary" && "border border-blue-800",
        variant === "text" && "h-auto px-0 border-transparent",
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      {iconAfter && <span>{iconAfter}</span>}
    </button>
  );
};

export default Button;
