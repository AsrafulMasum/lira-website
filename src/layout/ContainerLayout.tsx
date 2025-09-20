import React from "react";

type ContainerLayoutProps = React.PropsWithChildren<{}>;

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
  return <div className="w-full max-w-[1280px] px-4 xl:px-0 xl:mx-auto">{children}</div>;
};

export default ContainerLayout;
