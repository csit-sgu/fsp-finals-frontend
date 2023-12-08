import { TextField, Box, Typography, Button } from '@mui/material';

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
        <Button variant="contained">Войти</Button>
      </Box>
    </div>
  );
};
