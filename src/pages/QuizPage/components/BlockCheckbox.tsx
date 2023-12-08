import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

export interface BlockCheckboxProps {
  lock: boolean;
  submitCallback: () => void;
}

export const BlockCheckbox = ({ lock, submitCallback }: BlockCheckboxProps) => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <FormGroup>
            <FormControlLabel disabled={lock} control={<Checkbox />} label="First" />
            <FormControlLabel disabled={lock} control={<Checkbox />} label="Second" />
            <FormControlLabel disabled={lock} control={<Checkbox />} label="Third" />
          </FormGroup>
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
