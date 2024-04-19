import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Loader from '../../Components/Loaders/Loader';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const VerifyEmail = () => {
  const { token } = useParams();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${apiUrl}/verify/mail?token=${token}`);
        // Simulating loading for 3 seconds
        setTimeout(() => {
          setLoading(false);
          if (response.data.success) {
            Navigate('/');
          } else {
            console.error('Email verification failed:', response.data.message);
            toast.error('Email verification failed: ' + response.data.message);
          }
        }, 3000);
      } catch (error) {
        console.error('Error verifying email:', error);
        toast.error('Error verifying email: ' + error.message);
      }
    };

    verifyEmail();

    // Clean up function
    return () => {
      // Cleanup if needed
    };
  }, [token, Navigate]);

  return (
    <div id='verifyemailblock'>
      {loading ? (
        <Loader /> // Display loader while loading
      ) : null}
      <Toaster />
    </div>
  );
};

export default VerifyEmail;
