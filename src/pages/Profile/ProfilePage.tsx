import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { RadarChart } from './components/RadarChart';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useEffect, useState } from 'react';
import { getUser } from '../../backend';
import { useNavigate } from 'react-router-dom';
import { Bar } from '../Bar';
import { Attempt } from './components/Attempt';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<
    { max_score: number; quiz_score: number; quiz_id: number; quiz_title: string }[]
  >([]);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_attempts().then((r) => {
      setAttempts(r.data);
    });

    getUser().then((u) => {
      if (u === null) {
        navigate('/login');
        return;
      }

      setFullName(u?.name + ' ' + u?.surname);
      setLoading(false);
    });
  }, []);

  const chartData = {
    labels: [
      'Финансовые нарушения',
      'Защита персональных данных',
      'Защита личных цифровых устройств',
      'Правила работы в сети интернет',
    ],
    datasets: [
      {
        label: 'Компетенции за последний месяц',
        data: [55, 83, 96, 46],
        backgroundColor: ['#ff9800A0', '#ff9800A0', '#ff9800A0'],
        borderWidth: 3,
      },
    ],
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h2">Загрузка...</Typography>
      </Container>
    );
  }

  return (
    <Bar>
      <Container maxWidth="lg">
        <Typography variant="h2" textAlign="center">
          {fullName}
        </Typography>
        <RadarChart chartData={chartData} />
        <Grid container spacing={2}>
          {attempts.map((at) => (
            <Grid item xs={12} md={6}>
              <Attempt score={at.quiz_score} maxScore={at.max_score} title={at.quiz_title} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Bar>
  );
};

const get_attempts = async () => {
  return await axios.get(`${BACKEND_URL}/attempts`);
};
