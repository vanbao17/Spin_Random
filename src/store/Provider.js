import { useEffect, useState } from "react";
import { Context } from "./Context";
function Provider({ children }) {
  const [result, setresult] = useState([]);
  const [msbox, setmsbox] = useState(false);
  return (
    <Context.Provider value={{ result, setresult, msbox, setmsbox }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
