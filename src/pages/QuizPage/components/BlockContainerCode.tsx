import { Button, CardActions, CardContent, Card, TextField, Box, Typography } from '@mui/material';
import { BlockId, ContainerPayload } from '../QuizModels';
import { useState, Fragment } from 'react';
import { deployContainer, validateContainer } from '../../../backend';

interface BlockContainerCodeProps {
  block_id: BlockId;
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

export const BlockContainerCode = ({
  block_id,
  lock,
  payload,
  onSubmit,
}: BlockContainerCodeProps) => {
  const [localLock, setLocalLock] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [containerStarted, setContainerStarted] = useState<boolean>(false);
  const [checkState, setCheckState] = useState<CheckState>(CheckState.Idle);
  const submit = () => {
    onSubmit(payload.next_block, value);
  };
  const startContainer = () => {
    deployContainer(block_id, payload).then((res) => {
      setContainerStarted(true);
    });
  };
  const checkCode = () => {
    setCheckState(CheckState.Checking);
    setLocalLock(true);
    validateContainer(block_id, value).then((res) => {
      console.log(res);
      if (res.data) {
        setCheckState(CheckState.Correct);
        submit();
      } else {
        startContainer();
        setCheckState(CheckState.Incorrect);
        setLocalLock(false);
      }
    });
  };
  const onCodeChange = (event) => {
    setValue(event.target.value);
    setCheckState(CheckState.Idle);
  };

  let checkStatus = <Fragment />;
  switch (checkState) {
    case CheckState.Idle:
      break;
    case CheckState.Checking:
      checkStatus = <Typography mt={3}>Проверяем решение...</Typography>;
      break;
    case CheckState.Incorrect:
      checkStatus = <Typography mt={3}>Решение не корректно</Typography>;
      break;
    case CheckState.Correct:
      checkStatus = <Typography mt={3}>Решение прошло проверку!</Typography>;
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
          {lock || localLock ? (
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
