import React, {useContext} from "react";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//context
import {CursosContext} from "../../context/CursosContext"

import './Cart.css'

export const Cart = (props) => {
    const { counter } = props;
    const [stateContext, setStateContext] = useContext(CursosContext);
  return (
    <a
      href="#responsive-header"
      class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mx-4"
    >
      {stateContext.countCart > 0 && (
        <span className="Cart">{stateContext.countCart}</span>
      )}
      <FontAwesomeIcon icon={faShoppingCart} />
    </a>
  );
};
