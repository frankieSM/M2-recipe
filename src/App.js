import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Category from "./components/Category";
import Pages from "./pages/Pages";
import ironDevsLogo from "./images/iron-devs-logo.png"
//import { LuUtensils } from "react-icons/lu";
import styled from "styled-components";
//import { Link } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <PageTitle>Hell's Kitchen</PageTitle>
      <LogoImage src={ironDevsLogo} alt="Iron Devs Logo" />
      <BrowserRouter>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}


const LogoImage = styled.img`
  width: 150px;
  height: auto;
  border: 2px solid #FFFFFF;
  border-radius: 5px;
  margin-left: 20px;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-top: 30px;
  color: #FFFFFF;
  font-size: 2rem;
`;

export default App;
