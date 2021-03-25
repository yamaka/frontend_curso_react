import React from "react";
import axios from "axios";

const WEB_ROOT = "http://localhost:8080/api/cursos";
export default class Cursos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursos: [],
      titulo: "",
      descripcion: "",
      publicado: false,
      formulario: false,
      idEdit: null,
    };
  }

  componentDidMount() {
    this.getCursos();
  }

  getCursos = () => {
    fetch(WEB_ROOT)
      .then((response) => response.json())
      .then((jsonData) =>
        this.setState({
          cursos: jsonData,
        })
      );

    /*  axios.get(`http://localhost:8080/api/cursos`)
		.then(res => {
			console.log(res.data)
			this.setState({
				cursos:res.data
			})
		}) */
  };

  handleCreate = () => {
    this.setState({
      formulario: true,
    });
  };

  guardarCurso = () => {
    const { titulo, descripcion, publicado } = this.state;
    const params = {
      titulo,
      descripcion,
      publicado,
    };
    axios.post(WEB_ROOT, params).then((res) => {
      console.log(res.data);

      this.getCursos();
    });
  };

  handleEditarCurso = async () => {
    const { titulo, descripcion, publicado, idEdit, cursos } = this.state;
    const params = {
      titulo,
      descripcion,
      publicado,
    };

    try {
      //const response = await axios.put(WEB_ROOT`/${idEdit}`, params);
      setTimeout(() => {
        const response = axios
          .put(WEB_ROOT + "/" + idEdit, params)
          .then((response) => {});
      }, 3000);

      //const {data} = response
      //this.getCursos();
      const newCursos = cursos.map((curso) => {
        if (curso.id == idEdit) {
          curso.titulo = titulo;
          curso.descripcion = descripcion;
          curso.publicado = publicado;
        }
        return curso;
      });
      this.setState({
        curso: newCursos,
      });
    } catch (error) {
      console.error("ERROR!!!!!!", error.message ? error.message : error);
    }
  };

  eliminarCurso = async (id) =>{
	  const {cursos} = this.state
	try {
		const response = await axios.delete(WEB_ROOT +'/'+ id);
		debugger;
		/* const cursoIndex = cursos.findIndex(curso => curso.id == id)
		const newCursos = cursos.splice(cursoIndex, 1) */

		const newCursos = cursos.filter(curso=> curso.id != id)
		this.setState({
			cursos: newCursos
		})
	} catch (error) {
		
	}
  }

  editarCurso = (id) => {
    const { cursos } = this.state;
    const curso = cursos.find((curso) => curso.id == id);
    this.setState(
      {
        titulo: curso.titulo,
        descripcion: curso.descripcion,
        idEdit: curso.id,
      },
      () => this.handleCreate()
    );
  };

  handleInput = (estado, valor) => {
    this.setState({
      [estado]: valor,
    });
  };

  render() {
    const {
      cursos,
      titulo,
      descripcion,
      publicado,
      formulario,
      idEdit,
    } = this.state;

    if (cursos.length == 0) {
      return <div>cargando...</div>;
    }
    return (
      <div className="flex flex-col justify-center p-3">
        {formulario && (
          <div
            style={{
              padding: "2rem",
              borderRadius: "2rem",
              border: "solid 2px",
            }}
          >
            <input
              className="focus:outline-none focus:ring focus:border-blue-300"
              placeholder="titulo"
              value={titulo}
              onChange={(e) => this.handleInput("titulo", e.target.value)}
            />
            <input
              placeholder="descripcion"
              value={descripcion}
              onChange={(e) => this.handleInput("descripcion", e.target.value)}
            />
            <input
              placeholder="publicado"
              value={publicado}
              onChange={(e) => this.handleInput("publicado", e.target.value)}
            />
            {!idEdit && (
              <button
                className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => this.guardarCurso()}
              >
                {" "}
                guardar
              </button>
            )}

            {idEdit && (
              <button
                className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => this.handleEditarCurso()}
              >
                {" "}
                editar
              </button>
            )}
          </div>
        )}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => this.handleCreate()}
          >
            agregar
          </button>
        </div>
        <table class="table-fixed border-2 rounded border-black">
          <thead>
            <tr>
              <th class="w-1/2 ...">Titulo</th>
              <th class="w-1/4 ...">Descripcion</th>
              <th class="w-1/4 ...">Publicado</th>
              <th class="w-1/4 ...">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr>
                <td>{curso.titulo}</td>
                <td>{curso.descripcion}</td>
                <td>{curso.publicado ? "Si" : "No"}</td>
                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => this.editarCurso(curso.id)}
                  >
                    editar
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => this.eliminarCurso(curso.id)}
                  >
                    eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
