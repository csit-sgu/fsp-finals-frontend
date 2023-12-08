import { Box, Button, TextField, Typography } from '@mui/material';

export const RegisterPage = () => {
  return (
    <div
      style={{
        height: '100vh',
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
        <Button variant="contained">Зарегистрироваться</Button>
      </Box>
    </div>
  );
};
