import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


function Vegan() {
  const [vegan, setVegan] = useState([]);

  // Running the function
  useEffect(() => {
    getVegan();
  }, []);

  // Fetching recipes from Spoonacular API
  const getVegan = async () => {
    const check = localStorage.getItem('vegan');

    if (check) {
        setVegan(JSON.parse(check));
    } else {
        try {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8&tags=vegan`);
            const data = await api.json();

            localStorage.setItem('vegan', JSON.stringify(data.recipes));
            console.log(data.recipes);
            setVegan(data.recipes);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
};


  return(
    <div>
      <Carousel>
          <h2>Vegan Recipes</h2>
          <Splide
              options={{
                  perPage: 4,
                  arrows: false,
                  pagination: true,
                  drag: "free",
                  gap: "1rem",
              }}
          >
              {vegan && vegan.length > 0 && (
                  vegan.map((recipe) => (
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

export default Vegan;
