import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  type = "button",
  className = "",
  fullWidth = true,
  asChild,
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(
        "w-[150px] px-6 py-2 rounded-xl font-medium text-white",
        // Background gradient for light & dark modes
        "bg-gradient-to-r from-emerald-400 to-green-500 dark:from-zinc-700 dark:to-zinc-900",

        // On hover, override background color (black in both modes)
        "hover:bg-black dark:hover:bg-black",

        // Ensure gradient is overridden on hover
        "hover:from-black hover:to-black",

        // Smooth transitions
        "transition-all duration-300 ease-in-out shadow-md overflow-hidden group",

        className
      )}
      {...props}
    >
      <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-2">
        {children}
      </span>
    </button>
  );
}
