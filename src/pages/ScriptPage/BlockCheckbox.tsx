import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

// TODO: add types
export const BlockCheckbox = ({ lock, submitCallback }: any) => {
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Card variant="outlined">
        <CardContent>
          <FormGroup>
            <FormControlLabel disabled={lock} control={<Checkbox />} label="Label" />
            <FormControlLabel disabled={lock} control={<Checkbox />} label="Required" />
            <FormControlLabel disabled={lock} control={<Checkbox />} label="Disabled" />
          </FormGroup>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={submitCallback}>Принять</Button>
        </CardActions>
      </Card>
    </Box>
  );
}