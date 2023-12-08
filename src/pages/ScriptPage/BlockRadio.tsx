import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

// TODO: add types
export const BlockRadio = ({ lock, submitCallback }: any) => {
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Card variant="outlined">
        <CardContent>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio disabled={lock}/>} label="Female" />
              <FormControlLabel value="male" control={<Radio disabled={lock}/>} label="Male" />
              <FormControlLabel value="other" control={<Radio disabled={lock}/>} label="Other" />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={submitCallback}>Принять</Button>
        </CardActions>
      </Card>
    </Box>
  );
};
