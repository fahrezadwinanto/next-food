import axios from 'axios';
import { getCookie } from 'cookies-next';
import withAuth from '../hoc/withAuth';

function Menu({ foods }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Food Menu</h1>
      <div className="grid grid-cols-3 gap-4">
        {foods.map(food => (
          <div key={food.id} className="border p-4">
            <h2 className="font-bold text-xl">{food.name}</h2>
            <a href={`/${food.id}`} className="text-blue-500">View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
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

  // Fetch menu data from API if token exists
  try {
    const response = await axios.get('https://api-bootcamp.do.dibimbing.id/api/v1/foods', {
      headers: {
        'apiKey': 'w05KkI9AWhKxzvPFtXotUva-',
        'Authorization': `Bearer ${token}`,
      },
    });

    return {
      props: {
        foods: response.data.data,  // Pass the foods data to the page
      },
    };
  } catch (error) {
    return {
      props: {
        foods: null,
      },
    };
  }
}

// Membungkus halaman ini dengan HOC `withAuth` untuk melindunginya
export default withAuth(Menu);
