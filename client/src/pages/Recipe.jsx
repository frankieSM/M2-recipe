import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <RecipeInfo>
        <RecipeImage src={details.image} alt={details.title} />
        <RecipeTitle>{details.title}</RecipeTitle>
      </RecipeInfo>
      <Tabs>
        <TabButton
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </TabButton>
        <TabButton
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </TabButton>
      </Tabs>
      {activeTab === "instructions" && (
        <TabContent>
          <SectionTitle>Instructions</SectionTitle>
          <div dangerouslySetInnerHTML={{ __html: details.instructions }} />
        </TabContent>
      )}
      {activeTab === "ingredients" && (
        <TabContent>
          <SectionTitle>Ingredients</SectionTitle>
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <IngredientItem key={ingredient.id}>
                {ingredient.original}
              </IngredientItem>
            ))}
          </ul>
        </TabContent>
      )}
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 4rem;
`;

const RecipeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const RecipeImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const RecipeTitle = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  color: #313131;
  margin-right: 2rem;
  transition: all 0.3s ease;

  &.active {
    background-color: #313131;
    color: white;
    border: none;
    border-radius: 4px;
  }

  &:hover {
    background-color: #313131;
    color: white;
    border: none;
    border-radius: 4px;
  }
`;

const TabContent = styled.div`
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const IngredientItem = styled.li`
  font-size: 1.2rem;
  line-height: 1.5;
`;

export default Recipe;
