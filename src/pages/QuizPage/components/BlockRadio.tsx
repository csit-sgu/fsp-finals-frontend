import {
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';

export interface BlockRadioProps {
  lock: boolean;
  submitCallback: () => void;
}

export const BlockRadio = ({ lock, submitCallback }: BlockRadioProps) => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio disabled={lock} />} label="First" />
              <FormControlLabel value="male" control={<Radio disabled={lock} />} label="Second" />
              <FormControlLabel value="other" control={<Radio disabled={lock} />} label="Third" />
            </RadioGroup>
          </FormControl>
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
