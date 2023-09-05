import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function Popular() {
    const [popular, setPopular] = useState([]);

    // Running the function
    useEffect(() => {
        getPopular();
    }, []);

    // Fetching recipes from Spoonacular API
    const getPopular = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`);
        const data = await api.json();
        console.log(data);
        setPopular(data.recipes)
    }

    const carouselOptions = {
        items: 3,
        autoPlay: true,
        // Auto-play interval
        autoPlayInterval: 3000, 
        stopAutoPlayOnHover: true,
        mouseTracking: true,
        responsive: {
            // Smaller screens
            0: { items: 1 },
            // Medium screens
            768: { items: 3 }, 
        },
    };

    return (
        <div>
            <CarouselContainer>
                <h2>Popular Recipes</h2>
                {popular.length > 0 ? (
                    <AliceCarousel responsive={carouselOptions}>
                        {popular.map((recipe) => (
                            <Card key={recipe.id}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                            </Card>
                        ))}
                    </AliceCarousel>
                ) : (
                    <p>Loading...</p>
                )}
            </CarouselContainer>
        </div>
    )
}

const Card = styled.div`
    min-height: 18rem;
    width: 33.33%;
    margin: 0 1rem;
    
    img {
        width: 100%;
        border-radius: 1rem;
    }
`;

const CarouselContainer = styled.div`
    width: 100%;
    margin: 0 auto;

    @media (min-width: 768px) {
        width: 80%; /* Adjust the width for larger screens */
    }
`;

export default Popular;
