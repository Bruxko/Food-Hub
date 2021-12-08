import React from "react";
import styles from "./Paginate.module.css";

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i+1);
      }

      return (
          <nav>
              <ul className={styles.ul}>
                  {   pageNumbers && pageNumbers.map(number => (
                          <li key={number}>
                          <a className={styles.container} onClick={() => paginate(number)}>{number}</a>
                          </li>
                      ))}
              </ul>
          </nav>
      )
}