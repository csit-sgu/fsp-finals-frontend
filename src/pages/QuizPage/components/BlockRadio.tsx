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
import { BlockId, CasePayload } from '../QuizModels';
import { useState, Fragment } from 'react';

export interface BlockRadioProps {
  lock: boolean;
  payload: CasePayload;
  onSubmit: (blockId: BlockId, value: string) => void;
}

export const BlockRadio = ({ lock, payload, onSubmit }: BlockRadioProps) => {
  const [value, setValue] = useState<string>('');
  // TODO: don't sumbit unless at least one of answers was chosen
  const submit = () => {
    onSubmit(payload.options[value].next_block, value);
  };
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <FormControl>
            <FormLabel>Выберите ответ</FormLabel>
            <RadioGroup onChange={(event) => setValue(event.target.value)}>
              {Object.keys(payload.options).map((key, idx) => (
                <FormControlLabel
                  key={idx}
                  value={key}
                  control={<Radio disabled={lock} />}
                  label={key}
                />
              ))}
            </RadioGroup>
          </FormControl>
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
