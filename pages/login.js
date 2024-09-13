import { useState } from 'react';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api-bootcamp.do.dibimbing.id/api/v1/login', 
      {
        email: email,
        password: password,
      }, 
      {
        headers: {
          'apiKey': 'w05KkI9AWhKxzvPFtXotUva-',
          'Content-Type': 'application/json',
        },
      });

      // miftahfarhan@gmail.com
      // qwerty123

      // Save the token to cookies
      setCookie('token', response.data.token);
      
      // Redirect to homepage (menu list)
      router.push('/');
    } catch (error) {
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full mb-4 p-2 border rounded-md" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full mb-4 p-2 border rounded-md" 
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md">Login</button>
      </form>
    </div>
  );
}
