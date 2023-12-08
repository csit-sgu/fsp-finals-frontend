import { TextField, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
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
        <Typography variant="h2">Вход</Typography>
        <TextField variant="outlined" label="Имя пользователя" sx={{ marginBottom: '10px' }} />
        <TextField variant="outlined" label="Пароль" sx={{ marginBottom: '10px' }} />
        <Button variant="contained" sx={{ marginBottom: '10px' }}>
          Войти
        </Button>
        <Typography variant="body1">
          Вы можете <Link to="/register">зарегистрироваться</Link>, если у вас нет аккаунта
        </Typography>
      </Box>
    </div>
  );
};
