import Popular from "../components/Popular";
import Desserts from "../components/Desserts";
import Vegan from "../components/Vegan"
import React from "react";
import '../App.css'

function Home() {
  return (
    <div>
      <Popular />
      <Vegan />
      <Desserts />

    </div>
  );
}

export default Home;
