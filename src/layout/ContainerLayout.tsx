import React from "react";

type ContainerLayoutProps = React.PropsWithChildren<{}>;

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
  return <div className="w-full max-w-[1220px] mx-4 lg:mx-auto">{children}</div>;
};

export default ContainerLayout;
