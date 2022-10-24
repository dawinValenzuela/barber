import { useEffect } from 'react';
import { Register } from 'src/components';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';

function Signin() {
  return <Register />;
}

export default Signin;
