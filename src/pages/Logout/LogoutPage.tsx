import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';
import axios from 'axios';

export const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/logout`, { withCredentials: true }).then(() => {
      navigate('/');
    });
  });

  return <Typography>Выход...</Typography>;
};
