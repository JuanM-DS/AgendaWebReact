import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

const ContactForm = ({ onAddContact }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddContact({ nombre, apellido, telefono });
        setNombre('');
        setApellido('');
        setTelefono('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            
            <label htmlFor="apellido">Apellido</label>
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
            
            <label htmlFor="telefono">Teléfono</label>
            <input type="text" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
            
            <button type="submit">Agregar Contacto</button>
        </form>
    );
};

const ContactList = ({ contacts }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Teléfono</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index) => (
                    <tr key={index}>
                        <td>{contact.nombre}</td>
                        <td>{contact.apellido}</td>
                        <td>{contact.telefono}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

function App() {
  const [contacts, setContacts] = useState([]);
    const url = 'http://www.raydelto.org/agenda.php';

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setContacts(data));
    }, []);

    const addContact = (newContact) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newContact)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error adding contact: ${response.statusText}`);
            }
            return response.json();
        })
        .then(() => {
            setContacts([...contacts, newContact]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h1>Crear nuevo contacto</h1>
            <ContactForm onAddContact={addContact} />
            <ContactList contacts={contacts} />
        </div>
    );
}

export default App;
