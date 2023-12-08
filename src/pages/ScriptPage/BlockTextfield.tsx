import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

// TODO: add types
export const BlockTextfield = ({ lock, submitCallback }: any) => {
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Card variant="outlined">
        <CardContent>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            disabled={lock}
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={submitCallback}>Принять</Button>
        </CardActions>
      </Card>
    </Box>
  );
};
