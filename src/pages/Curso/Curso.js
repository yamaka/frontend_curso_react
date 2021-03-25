import React, {useEffect, useState} from 'react'
import axios from "axios";

import {useParams} from 'react-router-dom'

const WEB_ROOT = "http://localhost:8080/api/cursos";

const Curso = (props) => {
  debugger;
    const { idCurso } = useParams();
    const[curso, setCurso] = useState(null);
    useEffect(()=>{
      getCurso();

    },[]);

    const getCurso = async () =>{
        const response = await axios.get(`${WEB_ROOT}/${idCurso}`);
        setCurso(response.data);
    }

    if(!curso){
      return <div><p>Cargando Curso...</p></div>
    }

    return (
      <div className="flex flex-col w-full items-center justify-center h-full">
        <h1 className=" font-bold text-4xl">Detalle de un Curso</h1>
        <div className="flex flex-row">
          <h2 className=" font-bold text-2xl">Id:</h2>
          <h2 className=" font-semi-bold text-2xl ml-2">{` ${curso.id}`}</h2>
        </div>
        <div className="flex flex-row">
          <h2 className=" font-bold text-2xl">Titulo: </h2>
          <h2 className=" font-semi-bold text-2xl ml-2">{` ${curso.titulo}`}</h2>
        </div>
        <div className="flex flex-row">
          <h2 className=" font-bold text-2xl">descripcion: </h2>
          <h2 className=" font-semi-bold text-2xl ml-2">{` ${curso.descripcion}`}</h2>
        </div>
        <div className="flex flex-row">
          <h2 className=" font-bold text-2xl">Publicado: </h2>
          <h2 className=" font-semi-bold text-2xl ml-2">{` ${curso.publicado}`}</h2>
        </div>
      </div>
    );
}

export default Curso;
