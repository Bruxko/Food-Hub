import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import { useParams } from "react-router";
import styles from "./Detail.module.css";

export default function Detail (props) {
const dispatch = useDispatch()
const {id} = useParams()

useEffect(() => {dispatch(getDetail(id))}, [])
const detail = useSelector ((state) => state.detail)

return (
  <div>
    {
      detail.length > 0 ?
      <div className={styles.dt}>
        
        <h1 className={styles.title}>{detail[0].title}</h1>
        <img className={styles.imga} src= {detail[0].img ? detail[0].img : 'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
        <h3 className={styles.type}>Tipo de Dieta: {detail[0].typeDiets.map(t => t.name)}</h3>
        <h4 className={styles.type}>Tipo de Plato: {detail[0].dishTypes ? detail[0].dishTypes.map(d => d.name) :'Tipo de Plato no encontrado'}</h4>
        <h5 className={styles.type}>Resumen: {detail[0].summary.replace(/<[^>]*>?/g, "")}</h5>
        <h5 className={styles.type}>Nivel comida Saludable: {detail[0].healthScore}</h5>
        <h5 className={styles.type}>Puntuacion: {detail[0].spoonacularScore}</h5>
        <h5 className={styles.type}>Pasos:{ Array.isArray(detail[0].analyzedInstructions) ? detail[0].analyzedInstructions.map(e => e.steps.map(f => f.step)) : detail[0].analyzedInstructions }</h5>
        <Link to= '/home'><button className={styles.btn}>Volver</button></Link>
      </div> : <p>Loading...</p>
    }
    
  </div>
)

}