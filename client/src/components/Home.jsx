import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByTypeDiet, filterRecipesByCreated, orderByName, orderByPuntuation } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import styles from './Home.module.css';

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

    function handlePuntuation(e) {
        e.preventDefault();
        dispatch(orderByPuntuation(e.target.value));
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`);
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
        <div className={styles.bkg}>
            <Link to = '/recipe'><button className={styles.create}> Crea tu Receta </button></Link>
            <h1>FOOD HUB</h1>
            <SearchBar/>
            <button onClick={e => {handleClick(e)}} className={styles.refresh}>
                Volver a cargar todas las recetas
            </button>
            <div className={styles.filt}>
                <select onChange={e => handleSort(e)} className={styles.select}>
                    <option value='Asc'>A-Z</option>
                    <option value='Desc'>Z-A</option>
                </select>
                <select onChange={e => handlePuntuation(e)}  className={styles.select}>
                    <option value="All">All</option>
                    <option value="Asc">Highest Score</option>
                    <option value="Desc">Lowest Score</option>
                </select>
                <select onChange={e => handleFilterCreated(e)} className={styles.select}>
                    <option value="All">All Recipes</option>
                    <option value="created">Recipe Created</option>
                    <option value="api">Api Recipes</option>
                </select>
                <select onChange={e => handleFilterTypeDiet(e)} className={styles.select}>
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
                
                <div className={styles.paginado}>
                    <Paginate
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes.length}
                        paginate={paginate}
                    />
                </div>
                <div className={styles.cards}>
                    {currentRecipes?.map((el) => {
                        return (
                            
                                <Link to={"/recipes/" + el.id}>
                                    <Card title={el.title} img={el.img} typeDiets={el.typeDiets}/>
                                </Link>
                                                           
                        )
                    })}
                    
                    </div> 
                    
            </div>
            
        </div>
    )
}