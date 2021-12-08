import axios from 'axios';

export function getRecipes() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getTypeDiets (){
    
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/types`);
         console.log(json.data);
        return dispatch( {
            type : 'GET_TYPE_DIETS',
            payload: json.data
        })

    }
}

export function postRecipes (payload){
    return async function(dispatch){
        var json = await axios.post(`http://localhost:3001/recipe`,payload);
        return json
    }

}

export function getNameRecipes(name){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipes?name=' + name);
            return dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
            
        }catch(err){
            console.log(err)
        }
    }
}

export function filterRecipesByTypeDiet (payload){
    return {
        type : 'FILTER_BY_TYPEDIET',
        payload
    }
}

export function filterRecipesByCreated(payload){
    return{
        type: 'FILTER_BY_CREATED_RECIPE',
        payload
    }
}

export function orderByPuntuation (payload){
    return {
        type : 'ORDER_BY_PUNTUATION',
        payload
    }
}

export function orderByName (payload){
    return {
        type : 'ORDER_BY_NAME',
        payload
    }
}

export function getDetail(id) {
    return async function (dispatch) {
      try {
        var json = await axios.get("http://localhost:3001/recipes/" + id);
        return dispatch({
          type: "GET_DETAIL",
          payload: json.data,
        });
      } catch (error) {
        alert("Receta no encontrada");
      }
    };
}