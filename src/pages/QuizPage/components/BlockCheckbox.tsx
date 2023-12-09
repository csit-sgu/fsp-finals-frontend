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
import { BlockId, MultichoicePayload } from '../QuizModels';
import { useState, Fragment } from 'react';

export interface BlockCheckboxProps {
  lock: boolean;
  payload: MultichoicePayload;
  onSubmit: (blockId: BlockId, value: string | string[]) => void;
}

const getOptionsDict = (payload: MultichoicePayload) => {
  return Object.keys(payload.options).reduce((obj, key) => ({ ...obj, [key]: false }), {});
};

export const BlockCheckbox = ({ lock, payload, onSubmit }: BlockCheckboxProps) => {
  const [value, setValue] = useState(getOptionsDict(payload));
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [event.target.name]: event.target.checked,
    });
  };
  const submit = () => {
    const filtered = Object.entries(value)
      .filter((pair) => pair[1])
      .map((pair) => pair[0]);
    onSubmit(payload.next_block, filtered);
  };
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <FormGroup onChange={handleChange}>
            {Object.keys(payload.options).map((key, idx) => (
              <FormControlLabel
                key={idx}
                control={<Checkbox disabled={lock} name={key} />}
                label={key}
              />
            ))}
          </FormGroup>
        </CardContent>
        <CardActions>
          {lock ? (
            <Fragment />
          ) : (
            <Button size="small" onClick={submit}>
              Принять
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};
