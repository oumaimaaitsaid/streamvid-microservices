import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error
    
    const success = login(email, password);
    if (success) {
      navigate('/'); // Redirect direct l-catalogue
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f636692e-52db-427d-815d-391e7e010836/MA-fr-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <form onSubmit={handleSubmit} className="relative bg-black bg-opacity-80 p-12 rounded-lg w-[450px] shadow-2xl z-10">
        <h2 className="text-white text-3xl font-bold mb-8">S'identifier</h2>
        
        {error && <p className="bg-[#e87c03] text-white p-3 rounded text-sm mb-4">{error}</p>}
        
        <input 
          type="email" 
          placeholder="E-mail"
          className="w-full p-4 mb-4 bg-[#333] text-white rounded focus:outline-none focus:bg-[#454545] border-b-2 border-transparent focus:border-[#e87c03] transition"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input 
          type="password" 
          placeholder="Mot de passe"
          className="w-full p-4 mb-8 bg-[#333] text-white rounded focus:outline-none focus:bg-[#454545] border-b-2 border-transparent focus:border-[#e87c03] transition"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button className="w-full bg-red-600 text-white p-4 rounded font-bold hover:bg-red-700 transition duration-300">
          Se connecter
        </button>
        
        <div className="flex justify-between mt-4">
           <label className="text-gray-400 text-sm flex items-center">
             <input type="checkbox" className="mr-2" /> Souvenez-vous de moi
           </label>
           <span className="text-gray-400 text-sm hover:underline cursor-pointer">Besoin d'aide ?</span>
        </div>
        
        <p className="text-gray-500 mt-10 text-base">
          Première visite sur la plateforme ?{' '}
          <Link to="/register" className="text-white hover:underline font-medium">Inscrivez-vous maintenant.</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;