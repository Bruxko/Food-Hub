const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const API_KEY = '1df53bda114a486f98faf1e2cc48e7fd'


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            img: e.image,
            typeDiets: e.diets.map((d) => {return{name:d}}),
            spoonacularScore: e.spoonacularScore,
            dishTypes: e.dishTypes.map((d) => {return{name:d}}),
            summary: e.summary,
            healthScore: e.healthScore,
            analyzedInstructions: e.analyzedInstructions
        };
    });
    return apiInfo
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: TypeDiet,
            attributes: ['name'],
            through: {
                attributes:[]
            }
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const allRecipes = apiInfo.concat(dbInfo);
    return allRecipes
}

module.exports = router;
