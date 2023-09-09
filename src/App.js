import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Category from "./components/Category";
import Pages from "./pages/Pages";
// import { LuUtensils } from "react-icons/lu";
// import styled from "styled-components";
// import { Link } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

/* const Logo = styled(Link)`
  text-decoration: none;
  font-family: 'Bebas Neue', sans-serif;
` */

export default App;
