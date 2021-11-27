const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Recipe, TypeDiet } = require ('../db');
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

router.get('/recipes', async (req, res) => {
    const name = req.query.name
    const recipesTotal = await getAllRecipes();
    if (name) {
        let recipeTitle = await recipesTotal.filter(el => el.title.toLowerCase().includes(name.toLowerCase()));
        recipeTitle.length ?
        res.status(200).send(recipeTitle) :
        res.status(404).send("No se encontro la receta")
    } else {
        res.status(200).send(recipesTotal)
    }
});

router.get('/types', async (req, res) => {
    const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    const types = await recipesApi.data.results.map(el => el.diets);
    const diets = types.flat();
    const typeDiets = [...new Set(diets), "vegetarian"];
    typeDiets.forEach(el => {
        TypeDiet.findOrCreate({
            where: {name: el},
        })
    })
    const allDiets = await TypeDiet.findAll();
    res.send(allDiets);
});

router.post('/recipe', async (req, res) => {
    let {
        title,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
        createdInDb,
        typeDiets
    } = req.body;
    if (!title || !summary) {
        return res.status(404).send('Por favor, ingrese un título y un resumen para continuar');
    }
    let createRecipe = await Recipe.create({
        title,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
        createdInDb
    })
    let dietTypeDb = await TypeDiet.findAll({
        where: { name: typeDiets}
    })
    createRecipe.addTypeDiet(dietTypeDb)
    res.status(200).send('Receta creada con exito!')
})

module.exports = router;
