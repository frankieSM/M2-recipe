import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


function Popular() {
  const [popular, setPopular] = useState([]);

  // Running the function
  useEffect(() => {
    getPopular();
  }, []);

  // Fetching recipes from Spoonacular API
  const getPopular = async () => {
    const check = localStorage.getItem('popular');

    if (check) {
        setPopular(JSON.parse(check));
    } else {
        try {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`);
            const data = await api.json();

            localStorage.setItem('popular', JSON.stringify(data.recipes));
            console.log(data.recipes);
            setPopular(data.recipes);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
};


  return(
    <div>
      <Carousel>
          <h2>Most Popular</h2>
          <Splide
              options={{
                  perPage: 4,
                  arrows: false,
                  pagination: true,
                  drag: "free",
                  gap: "1rem",
              }}
          >
              {popular && popular.length > 0 && (
                  popular.map((recipe) => (
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
  margin: 4rem 10rem;`

;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 1rem;
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

export default Popular;
