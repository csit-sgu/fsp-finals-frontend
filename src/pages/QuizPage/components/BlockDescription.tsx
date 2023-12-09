import { Box, Card, CardContent, Typography } from '@mui/material';

interface DescriptionProps {
  text: string;
}

export const BlockDescription = ({ text }: DescriptionProps) => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1">{text}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
