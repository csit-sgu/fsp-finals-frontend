import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { RadarChart } from './RadarChart';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useEffect, useState } from 'react';

export const ProfilePage = () => {
  const [attempts, setAttempts] = useState([]);
  useEffect(() => {
    get_attempts().then((r) => {
      setAttempts(r.data);
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

  return (
    <Container maxWidth="lg">
      <Typography variant="h2">Иван Иванов</Typography>
      <RadarChart chartData={chartData} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>Компетенции</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>
                Календарь решённых сценариев
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: '18px', fontWeight: 500, marginBottom: '10px' }}>
                Решённые сценарии
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Сценарий 1: 10.2/12</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Сценарий 2: 10.2/12</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Сценарий 3: 10.2/12</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Сценарий 4: 10.2/12</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const get_attempts = async () => {
  return await axios.get(`${BACKEND_URL}/attempts`);
};
