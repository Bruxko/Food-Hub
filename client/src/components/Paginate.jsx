import React from "react";

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i+1);
      }

      return (
          <nav>
              <ul className='paginate'>
                  {   pageNumbers && pageNumbers.map(number => (
                          <li className='number' key={number}>
                          <a onClick={() => paginate(number)}>{number}</a>
                          </li>
                      ))}
              </ul>
          </nav>
      )
}