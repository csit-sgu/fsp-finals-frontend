import {
  Checkbox,
  FormGroup,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  FormControlLabel,
} from '@mui/material';

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
