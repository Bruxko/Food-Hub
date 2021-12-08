

const initialState = {
    recipes: [],
    detail: [],
    allRecipes: [],
    typediets: []
}

function rootReducer (state = initialState, action){
    switch(action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

            case 'GET_NAME_RECIPES':
                return{
                    ...state,
                    recipes: action.payload,
                }

                case 'GET_TYPE_DIETS':
                    return {
                        ...state,
                        typediets : action.payload
                    }      

                case 'POST_RECIPE':
                    return{
                        ...state,
                    }

            case 'FILTER_BY_TYPEDIET':
                const allRec = state.allRecipes
                const typeDietFilter = action.payload === 'All' ? allRec : allRec.filter(t => t.typeDiets.find(e => e.name === action.payload))  
                
                return {
                    ...state,
                    recipes: typeDietFilter
                }

                case 'FILTER_BY_CREATED_RECIPE':            
                const createdFilter = action.payload === 'created' ? state.allRecipes.filter(e=> e.createdInDb) : state.allRecipes.filter(e=> !e.createdInDb)
                return{
                    ...state,
                    recipes: action.payload === 'All' ? state.allRecipes : createdFilter
                }

                case 'ORDER_BY_NAME' :
                    let order = action.payload === 'Asc' ? 
                    state.recipes.sort(function(a,b) {
                        
                        if(a.title.toLowerCase() > b.title.toLowerCase()) {
                          
                            return 1
                        }
                        if( b.title.toLowerCase() > a.title.toLowerCase()){
                            return -1
                        }
                        return 0
                    }) : 
                    state.recipes.sort(function(a,b) {
                        if(a.title.toLowerCase() > b.title.toLowerCase()) {
                            return -1
                        }
                        if( b.title.toLowerCase() > a.title.toLowerCase()){
                            return 1
                        }
                        return 0
                    })
                    return{
                        ...state ,
                        recipes : order
        
                }

                case 'ORDER_BY_PUNTUATION' : 
                let orderpunt = action.payload === 'Desc' ? 
                    state.recipes.sort(function(a,b) {
                        if(a.spoonacularScore > b.spoonacularScore) {
                            return 1
                        }
                        if( b.spoonacularScore > a.spoonacularScore){
                            return -1
                        }
                        return 0
                    }) : 
                    state.recipes.sort(function(a,b) {
                        if(a.spoonacularScore > b.spoonacularScore) {
                            return -1
                        }
                        if( b.spoonacularScore > a.spoonacularScore){
                            return 1
                        }
                        return 0
                    })
                    return{
                        ...state ,
                        recipes : orderpunt
                }

                case 'GET_DETAIL':
                    return {
                      ...state,
                      detail: action.payload,
                    };

            default:
                return state;
    }
}

export default rootReducer