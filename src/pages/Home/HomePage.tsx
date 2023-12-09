import {
  Grid,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Container,
  Typography,
  Box,
} from '@mui/material';
import { Bar } from '../Bar';

interface IQuizCard {
  title: string;
  caption: string;
}

const QuizCardVert = ({ title, caption }: IQuizCard) => {
  return (
    <Card variant="outlined">
      <CardMedia component="img" height="140" image="https://a.d-cd.net/8gAAAgEWEeA-1920.jpg" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large">Открыть</Button>
      </CardActions>
    </Card>
  );
};

const QuizCardHor = () => {
  return (
    <Card>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <CardContent>
            <Typography variant="h5" component="div">
              Тема сценария
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Финансовые нарушения, Защита персональных данных
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs="auto">
          <CardActions>
            <Button variant="contained" size="large" href="/quizzes/1">
              Открыть
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export const HomePage = () => {
  return (
    <Bar>
      <Box mt={12}>
        <Container maxWidth="lg">
          <Typography variant="h4">Типы тестирования</Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            columnSpacing={2}
          >
            <Grid item xs={4}>
              <QuizCardVert
                title="Простые тесты"
                caption="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica"
              />
            </Grid>
            <Grid item xs={4}>
              <QuizCardVert
                title="Решение кейсов"
                caption="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctic"
              />
            </Grid>
            <Grid item xs={4}>
              <QuizCardVert
                title="Симуляции"
                caption="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica"
              />
            </Grid>
          </Grid>

          <br />
          <Typography variant="h4">Тестирование компетенций</Typography>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            columnSpacing={2}
            rowSpacing={2}
          >
            <Grid item xs={6}>
              <QuizCardVert title="Финансовые нарушения" caption="" />
            </Grid>
            <Grid item xs={6}>
              <QuizCardVert title="Защита персональных данных" caption="" />
            </Grid>
            <Grid item xs={6}>
              <QuizCardVert title="Защита личных цифровых устройств" caption="" />
            </Grid>
            <Grid item xs={6}>
              <QuizCardVert title="Правила работы в сети интернет" caption="" />
            </Grid>
          </Grid>

          <br />
          <Typography variant="h4">Последние квизы</Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            columnSpacing={0}
            rowSpacing={2}
          >
            {[...new Array(10)].map((_, i) => (
              <Grid item key={i} xs={12}>
                <QuizCardHor />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Bar>
  );
};
