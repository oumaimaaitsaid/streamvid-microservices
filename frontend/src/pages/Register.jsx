import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (formData.username.length < 3) tempErrors.username = "Le nom d'utilisateur est trop court.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "E-mail non valide.";
    if (formData.password.length < 6) tempErrors.password = "Le mot de passe doit faire au moins 6 caractères.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      register({ ...formData, id: Date.now() });
      navigate('/login'); // Siftou l-login bach it-connecta
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-95">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10 rounded-lg w-96 shadow-2xl border border-zinc-800">
        <h2 className="text-white text-3xl font-bold mb-8">Créer un compte</h2>
        
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Nom d'utilisateur"
            className={`w-full p-3 bg-zinc-800 text-white rounded border-b-2 ${errors.username ? 'border-red-600' : 'border-transparent'}`}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
          {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username}</p>}
        </div>
        
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="E-mail"
            className={`w-full p-3 bg-zinc-800 text-white rounded border-b-2 ${errors.email ? 'border-red-600' : 'border-transparent'}`}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div className="mb-6">
          <input 
            type="password" 
            placeholder="Mot de passe"
            className={`w-full p-3 bg-zinc-800 text-white rounded border-b-2 ${errors.password ? 'border-red-600' : 'border-transparent'}`}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
        </div>
        
        <button className="w-full bg-red-600 text-white p-4 rounded font-bold hover:bg-red-700 transition-all active:scale-95">
          S'inscrire
        </button>

        <p className="text-gray-500 mt-6 text-center">
          Déjà membre ? <Link to="/login" className="text-white hover:underline font-bold">Connectez-vous</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;