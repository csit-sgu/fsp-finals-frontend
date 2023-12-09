import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { Bar } from '../Bar';

export const ProfilePage = () => {
  return (
    <Bar>
      <Container maxWidth="lg">
        <Typography variant="h2">Иван Иванов</Typography>
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
    </Bar>
  );
};
