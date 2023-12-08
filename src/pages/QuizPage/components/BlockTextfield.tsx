import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

export interface BlockTextfieldProps {
  lock: boolean;
  submitCallback: () => void;
}

export const BlockTextfield = ({ lock, submitCallback }: BlockTextfieldProps) => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            disabled={lock}
            sx={{ width: '100%' }}
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={submitCallback}>
            Принять
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
