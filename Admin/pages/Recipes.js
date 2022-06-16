import React, { useState, useEffect } from "react";
import axios from 'axios';
import ImageIntroCard from '../components/card/ImageIntroCard'

import RecipeCard from "../components/card/RecipeCard";

const Recipes = () => {

    
    const [poin, setPoin] = useState([])
    async function fetchPosts() {
        const res = await axios.get('http://localhost:8081/api/HealthRecipe');
        setPoin(res.data);
        console.log(poin);
    }

    useEffect(() => {
        fetchPosts()
    })

    return (
        <div>
            <ImageIntroCard
                img="/images/svg/recipes.svg"
                title="ПОЛЕЗНЫЕ РЕЦЕПТЫ"
            ></ImageIntroCard>

            <div className="background-image-blur"></div>

            <div className="container-lg">
                <div className="row justify-content-center">
                    {poin.map(point=>
                    <div className="col-lg-6 mb-2 h-100">
                        <RecipeCard
                            point={point}
                            name="Постная гречка с овощами и орегано на воде                            "
                            image="https://samors.ru/wp-content/uploads/2020/11/Grechka-s-ovoshhami-i-oregano.jpg"
                        ></RecipeCard>
                    </div>
                   ) }
                   
                </div>
            </div>
        </div>
    );
};

export default Recipes;
