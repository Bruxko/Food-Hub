import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByTypeDiet, filterRecipesByCreated, orderByName } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paginate from "./Paginate";

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [orden,setOrden] =useState('') 
    const [currentPage,setCurrentPage] = useState(1);
    const [recipesPerPage,setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect (() => {
        dispatch(getRecipes());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterTypeDiet(e) {
        dispatch(filterRecipesByTypeDiet(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterRecipesByCreated (e.target.value))
    }
    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`)
    
    }

    return (
        <div>
            <Link to = '/recipe'>Crea tu Receta</Link>
            <h1>FOOD PORN</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todas las recetas
            </button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value='Asc'>A-Z</option>
                    <option value='Desc'>Z-A</option>
                </select>
                <select>
                    <option value="All">All</option>
                    <option value="Asc">Highest Score</option>
                    <option value="Desc">Lowest Score</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value="All">All Recipes</option>
                    <option value="created">Recipe Created</option>
                    <option value="api">Api Recipes</option>
                </select>
                <select onChange={e => handleFilterTypeDiet(e)}>
                    <option value="default">All Diets</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="vegan">Vegan</option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="fodmap friendly">Formap Friendly</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                </select>
                    <Paginate
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes.length}
                        paginate={paginate}
                    />
                    {currentRecipes?.map((el) => {
                        return (
                                <div>
                                <Link to={"/home"}>
                                    <Card title={el.title} img={el.img} typeDiets={el.typeDiets}/>
                                </Link>
                                </div>                            
                        )
                    })}
            </div>
        </div>
    )
}