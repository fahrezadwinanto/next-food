import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = getCookie('token');

      // Jika tidak ada token, redirect ke halaman login
      if (!token) {
        router.replace('/login');
      }
    }, [router]);

    // Jika ada token, tampilkan halaman yang dilindungi
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
