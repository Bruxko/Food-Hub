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

export function orderByName (payload){
    return {
        type : 'ORDER_BY_NAME',
        payload
    }
}