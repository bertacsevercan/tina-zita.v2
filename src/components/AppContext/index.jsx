import React from "react";

const AppContext = React.createContext({
  isLogged: false,
  setLog: () => {},
});

export default AppContext;
