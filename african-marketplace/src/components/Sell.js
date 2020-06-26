import React, { useState } from "react";

import Header from "./Header";
import SellList from "./SellList";

import { ItemContext } from "../context/ItemContext";

function Sell() {
  const [state, setState] = useState("");

  return (
    <ItemContext.Provider value={[state, setState]}>
      <Header />
      <SellList />
    </ItemContext.Provider>
  );
}

export default Sell;
