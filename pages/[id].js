import axios from 'axios';
import { getCookie } from 'cookies-next';
import withAuth from '../hoc/withAuth';

function FoodDetail({ food }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{food.name}</h1>
      <img src={food.imageUrl} alt={food.name} className="w-full h-64 object-cover" />
      <p className="mt-4">Created on: {new Date(food.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const token = getCookie('token', { req, res });

  if (!token) {
    // If no token, redirect to login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${params.id}`, {
      headers: {
        'apiKey': 'w05KkI9AWhKxzvPFtXotUva-',
        'Authorization': `Bearer ${token}`,
      },
    });

    return {
      props: {
        food: response.data.data,  // Pass food detail data to the page
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',  // Redirect to homepage if error occurs
        permanent: false,
      },
    };
  }
}

// Membungkus halaman ini dengan HOC `withAuth` untuk melindunginya
export default withAuth(FoodDetail);
