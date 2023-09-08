import Popular from "../components/Popular";
import Desserts from "../components/Desserts";
import Vegan from "../components/Vegan"

import React from "react";

function Home() {
  return (
    <div>
      <Popular />
      <Desserts />
      <Vegan />
    </div>
  );
}

export default Home;
