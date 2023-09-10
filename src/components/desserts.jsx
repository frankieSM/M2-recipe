import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


function Desserts() {
  const [desserts, setDesserts] = useState([]);

  // Running the function
  useEffect(() => {
    getDesserts();
  }, []);

  // Fetching recipes from Spoonacular API
  const getDesserts = async () => {
    const check = localStorage.getItem('desserts');

    if (check) {
        setDesserts(JSON.parse(check));
    } else {
        try {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8&tags=dessert`);
            const data = await api.json();

            localStorage.setItem('desserts', JSON.stringify(data.recipes));
            console.log(data.recipes);
            setDesserts(data.recipes);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
};


  return(
    <div>
      <Carousel>
          <h2>Desserts</h2>
          <Splide
              options={{
                  perPage: 4,
                  arrows: false,
                  pagination: true,
                  drag: "free",
                  gap: "1rem",
              }}
          >
              {desserts && desserts.length > 0 && (
                  desserts.map((recipe) => (
                      <SplideSlide key={recipe.id}>
                          <Card>
                              <p>{recipe.title}</p>
                              <img src={recipe.image} alt={recipe.title} />
                          </Card>
                      </SplideSlide>
                  ))
              )}
          </Splide>
      </Carousel>
    </div>);
}

const Carousel = styled.div`
  margin: 4rem 25rem;
  text-align: center;`

;

const Card = styled.div`
    min-height: 19rem;
    overflow: hidden;
    position: relative;

    img {

        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p {
        justify-content: center;
        align-items: center;
        display: flex;
        font-weight: bold;
    }
`
;

export default Desserts;
