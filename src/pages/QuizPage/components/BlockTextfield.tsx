import { Button, CardActions, CardContent, Card, TextField, Box } from '@mui/material';
import { BlockId, FreeAnswerPayload } from '../QuizModels';
import { useState, Fragment } from 'react';

export interface BlockTextfieldProps {
  lock: boolean;
  payload: FreeAnswerPayload;
  onSubmit: (blockId: BlockId, value: string) => void;
}

export const BlockTextfield = ({ lock, payload, onSubmit }: BlockTextfieldProps) => {
  const [value, setValue] = useState<string>('');
  const submit = () => {
    onSubmit(payload.next_block, value);
  };
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <TextField
            id="outlined-multiline-static"
            label="Свободный ответ"
            multiline
            rows={4}
            disabled={lock}
            sx={{ width: '100%' }}
            onChange={(event) => setValue(event.target.value)}
          />
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
