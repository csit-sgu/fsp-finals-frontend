import { Card, CardContent, Typography } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';

export const FeedbackCard = ({ block_feedback }: any) => {
  const { problem, feedback, score, correctness } = block_feedback;
  let color: string = '#ff00ff';
  switch (correctness) {
    case 0:
      color = red[500];
      break;
    case 1:
      color = yellow[700];
      break;
    case 2:
      color = green['A700'];
      break;
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body1" component="div">
          <strong>Вопрос</strong>: {problem}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Отзыв</strong>: {feedback}
        </Typography>
        <Typography variant="body1" component="div">
          <strong style={{ color: color }}>Полученный балл</strong>: {score}
        </Typography>
      </CardContent>
    </Card>
  );
};
