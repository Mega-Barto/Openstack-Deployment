import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Opcional: Agrega estilos en un archivo separado

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch items on component mount
  useEffect(() => {
    axios.get('http://localhost:8000/api/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle form submission for creating or updating items
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update item
      axios.put(`http://localhost:8000/api/items/${form.id}`, form)
        .then((response) => {
          const updatedItems = items.map((item) =>
            item.id === response.data.id ? response.data : item
          );
          setItems(updatedItems);
          resetForm();
        })
        .catch((error) => console.error('Error updating data:', error));
    } else {
      // Create new item
      axios.post('http://localhost:8000/api/items', form)
        .then((response) => {
          setItems([...items, response.data]);
          resetForm();
        })
        .catch((error) => console.error('Error posting data:', error));
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/items/${id}`)
      .then(() => {
        const filteredItems = items.filter((item) => item.id !== id);
        setItems(filteredItems);
      })
      .catch((error) => console.error('Error deleting data:', error));
  };

  // Prepare item for editing
  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  // Reset form
  const resetForm = () => {
    setForm({ id: null, name: '', description: '' });
    setIsEditing(false);
  };

  return (
    <div className="app-container">
      <h1 className="title">CRUD Animales</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Animal"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripcion"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
      <ul className="items-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <div className="item-details">
              <strong>{item.name}</strong>: {item.description}
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(item)}>Editar</button>
              <button onClick={() => handleDelete(item.id)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
