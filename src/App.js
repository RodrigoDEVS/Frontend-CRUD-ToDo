import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from "react";

const HOST_API = "http://localhost:8080/api"

const initialState = {
  list: [],
  item: []
}

const Store = createContext(initialState)

const Formul = () => {

  const formRef = useRef(null)

  const { dispatch, state: { item } } = useContext(Store)

  const [state, setState] = useState(item)

  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: null,
      isComplete: false
    };

    fetch(HOST_API + "/todo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "add-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  const onEdit = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: item.id,
      isCompleted: item.isCompleted
    };

    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  return <form className="container mt-5" ref={formRef}>
    <input type="text" name="name" defaultValue={item.name} onChange={(event) => {
      setState({ ...state, name: event.target.value })
    }} />
    {item.id && <button onClick={onEdit}>Actualizar</button>}
    {!item.id && <button onClick={onAdd}>Agregar</button>}
  </form>
}

const List = () => {

  const { dispatch, state } = useContext(Store)

  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then(response => response.json())
      .then(list => {
        dispatch({ type: "update-list", list })
      })
  }, [state.list.length, dispatch])

  const onDelete = (id) => {
    fetch(HOST_API + "/" + id + "/todo", {
      method: "DELETE"
    })
      .then((list) => {
        dispatch({ type: "delete-item", id })
      })
  }

  const onEdit = (element) => {
    dispatch({ type: "edit-item", item: element })
  }

  return <div >
    <table >
      <thead>
        <tr>
          <th>ID</th>
          <th >Nombre</th>
          <th >¿Está Completado?</th>
          <th >Acciones</th>
        </tr>
      </thead>
      <tbody>
        {state.list.map((element, index) => (
          <tr key={index}>
            <td>{element.id}</td>
            <td>{element.name}</td>
            <td >{element.isCompleted === true? "Si": "No"}</td>
            <td >
              <button onClick={() => { onEdit(element) }}>Editar</button>
              <button  onClick={() => onDelete(element.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

function reducer(state, action) {
  console.log(state)
  switch (action.type) {
    case 'update-item':
      const listUpdateEdit = state.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      return { ...state, list: listUpdateEdit, item: {} }
    case 'delete-item':
      const listUpdate = state.list.filter((item) => {
        return item.id !== action.id;
      });
      return { ...state, list: listUpdate }
    case 'update-list':
      return { ...state, list: action.list }
    case 'edit-item':
      return { ...state, item: action.item }
    case 'add-item':
      const newList = state.list;
      newList.push(action.item);
      return { ...state, list: newList }
    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

function App() {
  return <StoreProvider>
    <Formul />
    <List />
  </StoreProvider>
}

export default App;
