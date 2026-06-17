import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          // Use smooth scroll behavior for a better user experience
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Optionally scroll to top when hash is cleared (e.g., navigating to root path without hash)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]); // Re-run effect when location changes

  return null; // This component doesn't render anything
};

export default ScrollToHash;