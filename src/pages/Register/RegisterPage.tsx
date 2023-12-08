import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
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
      >
        <Typography variant="h2">Регистрация</Typography>
        <TextField variant="outlined" label="Имя и фамилия" sx={{ marginBottom: '10px' }} />
        <TextField variant="outlined" label="Логин" sx={{ marginBottom: '10px' }} />
        <TextField variant="outlined" label="Пароль" sx={{ marginBottom: '10px' }} />
        <TextField variant="outlined" label="Повторите пароль" sx={{ marginBottom: '10px' }} />
        <Button variant="contained" sx={{ marginBottom: '10px' }}>
          Зарегистрироваться
        </Button>
        <Typography variant="body1">
          Вы можете <Link to="/login">войти</Link>, если у вас есть аккаунт
        </Typography>
      </Box>
    </div>
  );
};
