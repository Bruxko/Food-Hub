import React from "react";

export default function Card({ title, img, typeDiets, id }) {
    return (
        <div key= {id}>
            <h3>{title}</h3>
            <img src={img} alt="img not found" width="200px" height="250px" />
            <div>  {typeDiets.map(t => <h5>{t.name}</h5>)}  </div> 
        </div>
    )
}