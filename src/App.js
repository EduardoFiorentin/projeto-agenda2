import MainBody from "./components/MainBody";
import React from 'react';
import { useState } from "react";
import './assets/css/reset.css'

const theme = {
  backgroundColor: "#F0F0F2",
  color: "#2E3140"
}
export const MyContext = React.createContext(theme)

function App() {
  const [themeState, setTheme] = useState(theme)
  return (
    <>
      <MyContext.Provider value={themeState}>
        <MainBody/>
      </MyContext.Provider>
    </>

  );
}





export default App;
