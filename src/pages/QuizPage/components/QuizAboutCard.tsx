import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';

export interface QuizAboutProps {
  name: string;
  theme: string;
  description: string;
  startCallback: () => void;
}

export const QuizAboutCard = ({ name, theme, description, startCallback }: QuizAboutProps) => {
  const [lock, setLock] = useState<boolean>(false);
  const onClick = () => {
    startCallback();
    setLock(true);
  };

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
        {lock ? (
          <React.Fragment />
        ) : (
          <Button size="small" onClick={onClick}>
            Начать выполнение
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
