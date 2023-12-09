import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export type QuizId = string | number;

interface IQuizCardHor {
  title: string;
  category: string;
  quizId: QuizId;
}

export const QuizCardHor = ({ title, category, quizId }: IQuizCardHor) => {
  const navigate = useNavigate();
  return (
    <Card variant="outlined">
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {category}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs="auto">
          <CardActions>
            <Button variant="contained" size="large" onClick={() => navigate(`/quizzes/${quizId}`)}>
              Открыть
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
