import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipes, getTypeDiets } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipeCreate.module.css'


function controlForm (input){
    let errors = {};
    if(!input.title) errors.title= 'Se requiere el nombre de la receta'
    if(!input.summary) errors.summary= 'Se requiere el resumen de la receta'
    if(input.spoonacularScore<0 || input.spoonacularScore>100) errors.spoonacularScore='La puntuación debe ser entre 0 y 100'
    if(input.healthScore<0 || input.healthScore>100) errors.healthScore='La puntuación debe ser entre 0 y 100'
    if(!input.analyzedInstructions) errors.analyzedInstructions= 'Se requieren los pasos para la receta'
    return errors
}

export default function CreateRecipe() {
    const dispatch = useDispatch()
    const history = useHistory()
    const listDiets = useSelector((state) => state.typediets )
    const [errors,setErrors] = useState({})

    const [input,setInput] = useState({
        title :'',
        summary:'',
        spoonacularScore:'',
        healthScore:'',
        analyzedInstructions:'',
        typeDiets:[]
    })

    function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
        setErrors(controlForm({
              ...input,
              [e.target.name]: e.target.value,
            })
          );
    }

    function handleSelect(e){
        setInput({
            ...input,
            typeDiets:[...input.typeDiets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipes(input))
        alert('Receta creada con Exito!!')
        setInput({
            title :'',
            summary:'',
            spoonacularScore:'',
            healthScore:'',
            analyzedInstructions:'',
            typeDiets:[]
        })
        history.push('/home')
    }

    function handleDelete(e){
        setInput({
            ...input,
            typeDiets: input.typeDiets.filter(diet => diet !== e )
        })
    }

    useEffect(() => {
        dispatch(getTypeDiets())
        },[dispatch])

    return (
        <div className={styles.bkg}>
            <Link to='/home'><button className={styles.btn}>Volver</button></Link>
            <h1 className={styles.h1}>Crea tu Receta!</h1>
            <form onSubmit={(e)=>handleSubmit(e)} className={styles.form}>
                <div>
                    <label>Nombre:</label>
                    <input
                     type='text'
                     name='title'
                     value={input.title}
                     onChange={(e)=>handleChange(e)}
                    />
                     { errors.title && (
                        <p className={styles.error}>{errors.title}</p>
                    ) }
                </div>
                <div>
                    <label>Summary:</label>
                    <input
                       type='text'
                       name='summary'
                       value={input.summary}
                       onChange={(e)=>handleChange(e)}
                    />
                    { errors.summary && (
                        <p className={styles.error}>{errors.summary}</p>
                    ) }
                </div>
                <div>
                    <label>Puntuacion:</label>
                    <input
                    type='text'
                    name='spoonacularScore'
                    value={input.spoonacularScore}
                    onChange={(e)=>handleChange(e)}
                    />
                    { errors.spoonacularScore && (
                        <p className={styles.error}>{errors.spoonacularScore}</p>
                    ) }
                </div>
                <div>
                    <label>Health Score</label>
                    <input
                     type='text'
                     name='healthScore'
                     value={input.healthScore}
                     onChange={(e)=>handleChange(e)}
                    />
                    { errors.healthScore && (
                        <p className={styles.error}>{errors.healthScore}</p>
                    ) }
                </div>
                <div>
                    <label>Paso a Paso</label>
                    <input
                        type='text'
                        name='analyzedInstructions'
                        value={input.analyzedInstructions}
                        onChange={(e)=>handleChange(e)}
                    />
                     { errors.analyzedInstructions && (
                        <p>{errors.analyzedInstructions}</p>
                    ) }
                </div>
                <select onChange={(e) => handleSelect(e)} className={styles.select}>
                    {listDiets.map((d) => (
                        <option value={d.name}>{d.name}</option>
                    ))}
                </select>
                <ul><li>{input.typeDiets.map(e =>e + ", ")}</li></ul>
                <button type='submit' className={styles.correct}>Crear Receta</button>
            </form>
            {input.typeDiets.map(e => {
                return(
               <div >
                    <p className={styles.types}>{e}</p>
                    <button className={styles.btnx} onClick={() => handleDelete(e)}>X</button>
                   
                </div>
            )})}
        </div>
    )


    }