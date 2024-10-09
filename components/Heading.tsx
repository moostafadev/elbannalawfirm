import React from "react";

const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={`w-fit mx-auto text-3xl sm:text-4xl font-bold text-primary relative before:absolute before:duration-300 before:w-[10%] before:h-1 before:left-1/2 before:-translate-x-1/2 before:-bottom-4 before:bg-primary hover:before:w-full  ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading;
