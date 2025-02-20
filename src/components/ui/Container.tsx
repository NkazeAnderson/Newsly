import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="px-2 md:px-10 lg:px-20">{children}</div>;
}

export default Container;
