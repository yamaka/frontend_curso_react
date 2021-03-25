import React, { useEffect, useState, useContext } from "react";

//components
import { CardCurso } from "../../components/CardCurso/CardCurso";

//context
import {CursosContext} from "../../context/CursosContext";

const WEB_ROOT = "http://localhost:8080/api/cursos";
const Home = ({ addToCart }) => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    getCursos();
  }, []);

  const getCursos = () => {
    fetch(WEB_ROOT)
      .then((response) => response.json())
      .then((jsonData) => setCursos(jsonData));
  };

  return (
    <div className="flex flex-col w-full items-center justify-center h-full w-11/12">
      <h1 className="font-bold text-4xl ">Top Cursos Disponibles</h1>
      <br />
      <br />
      <div className="flex flex-row flex-wrap justify-center w-full">
        {cursos.length &&
          cursos.map((curso, index) => (
            <CardCurso {...curso} />
          ))}
      </div>
    </div>
  );
};

export default Home;