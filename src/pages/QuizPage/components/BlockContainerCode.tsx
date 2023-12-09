import { Button, CardActions, CardContent, Card, TextField, Box, Typography } from '@mui/material';
import { BlockId, ContainerPayload } from '../QuizModels';
import { useState, Fragment } from 'react';

interface BlockContainerCodeProps {
  lock: boolean;
  payload: ContainerPayload;
  onSubmit: (blockId: BlockId, value: string) => void;
}

enum CheckState {
  Idle,
  Checking,
  Incorrect,
  Correct,
}

export const BlockContainerCode = ({ lock, payload, onSubmit }: BlockContainerCodeProps) => {
  const [localLock, setLocalLock] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [containerStarted, setContainerStarted] = useState<boolean>(false);
  const [checkState, setCheckState] = useState<CheckState>(CheckState.Idle);
  const submit = () => {
    onSubmit(payload.next_block, value);
  };
  const startContainer = () => {
    setContainerStarted(true);
    // TODO: send request to backend
  };
  const checkCode = () => {
    setCheckState(CheckState.Checking);
    setLocalLock(true);
    setTimeout(() => {
      let result = 1;
      if (result > 0) {
        setCheckState(CheckState.Correct); 
        submit();
      } else {
        setCheckState(CheckState.Incorrect);
        setLocalLock(false);
      }
    }, 5000);
  }
  const onCodeChange = (event) => {
    setValue(event.target.value);
    setCheckState(CheckState.Idle);
  }

  let checkStatus = <Fragment />;
  switch (checkState) {
    case CheckState.Idle:
      break;
    case CheckState.Checking:
      checkStatus = <Typography mt={3}>Проверяем решение...</Typography>
      break;
    case CheckState.Incorrect:
      checkStatus = <Typography mt={3}>Решение не корректно</Typography>
      break;
    case CheckState.Correct:
      checkStatus = <Typography mt={3}>Решение прошло проверку!</Typography>
      break;
  }

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          {containerStarted ? (
            <TextField
              id="outlined-multiline-static"
              label="Код для проверки"
              multiline
              rows={4}
              disabled={lock || localLock}
              sx={{ width: '100%' }}
              onChange={onCodeChange}
            />
          ) : (
            <Button variant="contained" onClick={startContainer}>
              Запустить контейнер
            </Button>
          )}
          {checkStatus}
        </CardContent>
        <CardActions>
          {(lock || localLock) ? (
            <Fragment />
          ) : (
            <Button size="small" onClick={checkCode}>
              Принять
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};
