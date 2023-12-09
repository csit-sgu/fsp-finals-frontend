import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Bar } from '../Bar';

const tiers = [
  {
    title: 'Бесплатный',
    price: '0',
    description: ['Неогрониченное колчество задач', 'Методические материалы'],
    buttonText: 'Зарегестрироваться',
    buttonVariant: 'outlined',
  },
  {
    title: 'Продвинутый',
    subheader: 'Самый популярный',
    price: '299',
    description: [
      'Задачи с реальными сценариями',
      'Режим симуляции настоящих уязвимостей',
      'Персональные объяснения ошибок',
    ],
    buttonText: 'Подписаться',
    buttonVariant: 'contained',
  },
  {
    title: 'Корпоративный',
    price: 'TBD',
    description: [
      'Доступ ко всем продвинутым возможностям для всех сотрудников компании',
    ],
    buttonText: 'Подключить',
    buttonVariant: 'outlined',
  },
];

export function SubscriptionsPage() {
  return (
    <ThemeProvider theme={useTheme()}>
      <Bar>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
          <Typography variant="h4" align="center" color="text.secondary" component="p">
            Самое время учиться информационной безопасности ещё эффективнее
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main" style={{ marginBottom: '100px' }}>
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? 'Star Icon' : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography component="h2" variant="h3" color="text.primary">
                        ₽{tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                          style={{ lineHeight: '20px', marginBottom: '10px' }}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={tier.buttonVariant as 'outlined' | 'contained'}>
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Bar>
    </ThemeProvider>
  );
}
