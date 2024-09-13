import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear cookies or tokens for logout
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Food Menu App</h1>
        <button onClick={handleLogout} className="bg-red-500 p-2">Logout</button>
      </div>
    </nav>
  );
}
