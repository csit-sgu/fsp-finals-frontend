import { LinearProgress, Typography } from '@mui/material';

export const Attempt = ({ score, title }: { score: number; title: string }) => {
  return (
    <div style={{ backgroundColor: '#F1F1F1', padding: '20px', borderRadius: '10px' }}>
      <Typography>
        <b>{title}</b> <i>(набрано очков: {score})</i>
      </Typography>
    </div>
  );
};
