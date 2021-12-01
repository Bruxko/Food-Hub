import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    useEffect (() => {
        dispatch(getRecipes());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    return (
        <div>
            <Link to = '/recipe'>Crea tu Receta</Link>
            <h1>FOOD PORN</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todas las recetas
            </button>
            <div>
                <select>
                    <option value='default'>All</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
                <select>
                    <option value="All">All</option>
                    <option value="Asc">Highest Score</option>
                    <option value="Desc">Lowest Score</option>
                </select>
                <select>
                    <option value="default">All Diets</option>
                </select>
                {
                    allRecipes?.map((el) => {
                        return (
                           
                                <Link to={"/home"}>
                                    <Card title={el.title} img={el.img} typeDiets={el.typeDiets}/>
                                </Link>
                            
                        )
                    })
                }
            </div>
        </div>
    )
}