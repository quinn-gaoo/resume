import { createContext, useContext } from "react";

const ViewContext = createContext({
  views: {},
  isLoading: false,
});

export function ViewProvider({ children }) {
  return (
    <ViewContext.Provider value={{ views: {}, isLoading: false }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useViewCounts(slug) {
  return {
    views: null,
    isLoading: false,
  };
}
