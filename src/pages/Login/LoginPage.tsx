import { TextField, Box, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import { FormEvent, useState } from 'react';

export const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    login({ username, password }).then((_) => {
      setLoading(false);
      navigate('/');
    });
  };

  return (
    <div
      style={{
        height: '95vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '500px',
        }}
        onSubmit={onSubmit}
      >
        <Typography variant="h2">Вход</Typography>
        <TextField
          variant="outlined"
          label="Имя пользователя"
          sx={{ marginBottom: '10px' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Пароль"
          sx={{ marginBottom: '10px' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" sx={{ marginBottom: '10px' }} type="submit" disabled={loading}>
          Войти
        </Button>
        <Typography variant="body1">
          Вы можете <Link to="/register">зарегистрироваться</Link>, если у вас нет аккаунта
        </Typography>
      </Box>
    </div>
  );
};

interface LoginDto {
  username: string;
  password: string;
}

const login = async (dto: LoginDto) => {
  const params = new URLSearchParams();
  params.append('username', dto.username);
  params.append('password', dto.password);
  await axios.post(`${BACKEND_URL}/auth`, params, { withCredentials: true });
};
