import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TrailingSlashEnforcer({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.pathname.endsWith('/')) {
      navigate(`${location.pathname}/`, { replace: true });
    }
  }, [location, navigate]);

  return children;
}

export default TrailingSlashEnforcer;
