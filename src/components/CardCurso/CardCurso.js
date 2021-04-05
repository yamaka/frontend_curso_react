import React, { useContext } from "react";
import axios from "axios";

//libraries
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components
import Config from "../../Config";
//context
import { CarritoContext } from "../../context/CarritoContext";
import { AuthContext } from "../../context/AuthContext";

//styles
import "./CardCurso.css";

export const CardCurso = ({
  id,
  titulo,
  descripcion,
  publicado,
  imagen = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  docente = "Sarah Dayan",
  addToCart,
}) => {
  const [
    stateContext, 
    setStateContext,
    addCurso
  ] = useContext(CarritoContext);

  const [authStateContext, setAuthStateContext, logoutContext] = useContext(
    AuthContext
  );

  const createCart = async () =>{
    debugger
    const {id} = authStateContext;
    const params = {
      userId: id,
    };
    try {
      const response = await axios.post(`${Config.WEB_ROOT}/carrito`, params)
      debugger
      if(response.data){
        return response.data;
      }
    } catch (error) {
      alert("error! createCart");
    }
  }

  const handleAddCursoToCart = async () =>{
    debugger
    const carritoData = await createCart()
    const params = {
      idCurso: id,
      idCarrito: carritoData.id
    };
    try {
      const response = await axios.post(`${ Config.WEB_ROOT}/carrito/add-curso`, params);
      if(response.data){
        setStateContext({ cursosCount: stateContext.cursosCount + 1 });
      }
    } catch (error) {
      alert("error! handleAddCursoToCart");
    }

  }


  return (
    <div className="bg-gray-100 rounded-xl p-8 w-1/5 m-2 ">
      <h2 className="font-bold text-lg">{titulo}</h2>
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src={imagen}
        alt=""
        width="384"
        height="512"
      />
      <div className="pt-6 text-center space-y-4">
        <blockquote>
          <p className="text-lg font-semibold">{descripcion}</p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-cyan-600">{docente}</div>
        </figcaption>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
           handleAddCursoToCart()
          }
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          &nbsp; carrito
        </button>
      </div>
    </div>
  );
};
