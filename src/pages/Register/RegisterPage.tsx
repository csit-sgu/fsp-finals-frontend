import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';
import { FormEvent, useState } from 'react';
import { Bar } from '../Bar';

export const RegisterPage = () => {
  const [registerInputs, setRegisterInputs] = useState<RegisterInDto>({
    username: '',
    password: '',
    // TODO: Create special input for birthdate
    birth_date: '',
    name: '',
    surname: '',
  });

  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    register(registerInputs).then((_) => {
      setLoading(false);
      navigate('/login');
    });
  };

  return (
    <Bar>
      <div
        style={{
          height: '80vh',
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
          <Typography variant="h2">Регистрация</Typography>
          <TextField
            variant="outlined"
            value={registerInputs.name}
            onChange={(e) => setRegisterInputs((inp) => ({ ...inp, name: e.target.value }))}
            label="Имя"
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            variant="outlined"
            label="Фамилия"
            value={registerInputs.surname}
            onChange={(e) => setRegisterInputs((inp) => ({ ...inp, surname: e.target.value }))}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            value={registerInputs.username}
            onChange={(e) => setRegisterInputs((inp) => ({ ...inp, username: e.target.value }))}
            variant="outlined"
            label="Логин"
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            variant="outlined"
            label="Дата рождения (ГОД-МЕСЯЦ-ДЕНЬ)"
            value={registerInputs.birth_date}
            onChange={(e) => setRegisterInputs((inp) => ({ ...inp, birth_date: e.target.value }))}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            variant="outlined"
            label="Пароль"
            sx={{ marginBottom: '10px' }}
            value={registerInputs.password}
            onChange={(e) => setRegisterInputs((inp) => ({ ...inp, password: e.target.value }))}
          />
          <TextField
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            variant="outlined"
            label="Повторите пароль"
            sx={{ marginBottom: '10px' }}
          />
          <Button
            variant="contained"
            sx={{ marginBottom: '10px' }}
            disabled={
              repeatPassword !== registerInputs.password || !registerInputs.password || loading
            }
            type="submit"
          >
            Зарегистрироваться
          </Button>
          <Typography variant="body1">
            Вы можете <Link to="/login">войти</Link>, если у вас есть аккаунт
          </Typography>
        </Box>
      </div>
    </Bar>
  );
};

interface RegisterInDto {
  username: string;
  password: string;
  birth_date: string;
  name: string;
  surname: string;
}

interface RegisterBody {
  username: string;
  password: string;
  is_admin: boolean;
  birth_date: string;
  name: string;
  surname: string;
  weekly_goal: number;
}

const register = async (dto: RegisterInDto) => {
  const body: RegisterBody = { ...dto, is_admin: false, weekly_goal: 100 };
  // TODO:
  await axios.post(`${BACKEND_URL}/register`, body);
};
