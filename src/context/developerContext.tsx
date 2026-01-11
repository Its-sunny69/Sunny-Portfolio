"use client";

import { createContext, useState } from "react";

const DeveloperContext = createContext({
    developerMode: false,
    setDeveloperMode: (mode: boolean) => {},
});

const DeveloperContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [developerMode, setDeveloperMode] = useState(false);

  return (
    <DeveloperContext.Provider value={{ developerMode, setDeveloperMode }}>
      {children}
    </DeveloperContext.Provider>
  );
};

export { DeveloperContext, DeveloperContextProvider };