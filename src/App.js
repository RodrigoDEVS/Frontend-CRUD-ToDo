import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from "react";
import { Button, Table, Form } from 'react-bootstrap'

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

  return <Form className="container mt-5" ref={formRef}>
    <Form.Control type="text" name="name" defaultValue={item.name} onChange={(event) => {
      setState({ ...state, name: event.target.value })
    }} />
    {item.id && <Button variant="secondary mt-2" onClick={onEdit}>Actualizar</Button>}
    {!item.id && <Button variant="primary mt-2" onClick={onAdd}>Agregar</Button>}
  </Form>
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

  return <div className="container mt-3">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th style={{ textAlign: "center" }}>Nombre</th>
          <th style={{ textAlign: "center" }}>¿Está Completado?</th>
          <th style={{ textAlign: "center" }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {state.list.map((element, index) => (
          <tr key={index}>
            <td>{element.id}</td>
            <td>{element.name}</td>
            <td style={{ textAlign: "center" }}>{element.isCompleted? "Si": "No"}</td>
            <td style={{ textAlign: "center" }}>
              <Button variant="primary" onClick={() => { onEdit(element) }}>Editar</Button>{' '}
              <Button variant="danger" onClick={() => onDelete(element.id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
}

function reducer(state, action) {
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
