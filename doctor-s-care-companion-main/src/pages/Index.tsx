import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to doctor dashboard by default
  return <Navigate to="/doctor/home" replace />;
};

export default Index;
