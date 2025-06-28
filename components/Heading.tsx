import React from "react";
import Animation from "./Animation";

const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Animation>
      <h3
        className={`text-center w-fit mx-auto text-3xl sm:text-4xl font-bold text-primary relative before:absolute before:duration-300 before:w-[10%] before:h-1 before:left-1/2 before:-translate-x-1/2 before:-bottom-4 before:bg-primary hover:before:w-full  ${className}`}
      >
        {children}
      </h3>
    </Animation>
  );
};

export default Heading;
