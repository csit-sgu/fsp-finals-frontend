import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { QuizId } from '../QuizModels';

export interface QuizAboutProps {
  id: QuizId;
  name: string;
  theme: string;
  description: string;
  startCallback: (id: QuizId) => void;
}

export const QuizAboutCard = ({ id, name, theme, description, startCallback }: QuizAboutProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {theme}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => startCallback(id)}>
          Начать выполнение
        </Button>
      </CardActions>
    </Card>
  );
};
