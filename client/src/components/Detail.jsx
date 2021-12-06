import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function Detail (props) {
const dispatch = useDispatch()
const {id} = useParams()

useEffect(() => {dispatch(getDetail(id))}, [])
const detail = useSelector ((state) => state.detail)

return (
  <div>
    {
      detail.length > 0 ?
      <div>
        <h1>{detail[0].title}</h1>
        <img src= {detail[0].img ? detail[0].img : 'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
        <h3>Tipo de Dieta: {detail[0].typeDiets.map(t => t.name)}</h3>
        <h4>Tipo de Plato: {detail[0].dishTypes ? detail[0].dishTypes.map(d => d.name) :'Tipo de Plato no encontrado'}</h4>
        <h5>Resumen: {detail[0].summary}</h5>
        <h5>Nivel comida Saludable: {detail[0].healthScore}</h5>
        <h5>Puntuacion: {detail[0].spoonacularScore}</h5>
        <h5>Pasos:{ Array.isArray(detail[0].analyzedInstructions) ? detail[0].analyzedInstructions.map(e => e.steps.map(f => f.step)) : detail[0].analyzedInstructions }</h5>
      </div> : <p>Loading...</p>
    }
    <Link to= '/home'>
      <button>Volver</button>
    </Link>
  </div>
)

}