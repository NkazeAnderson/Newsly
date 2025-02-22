import React, { createContext } from "react";
import useArticles from "../hooks/useArticles";

export const ArticlesContext = createContext<ReturnType<
  typeof useArticles
> | null>(null);

function ArticlesContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <ArticlesContext.Provider value={useArticles()}>
      {children}
    </ArticlesContext.Provider>
  );
}

export default ArticlesContextProvider;
