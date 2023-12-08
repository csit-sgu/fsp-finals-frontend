import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import {
  BlockFreeAnswerPayload,
  CreatingQuizBlock,
  QuizBlockId,
  UnbranchedAnswerChoice,
} from '../CreatingQuizModels';
import { NextBlockChooser } from './NextBlockChooser';

export const FreeAnswerPayloadEditor = ({
  value,
  onChange,
  createBlockCallback,
  blocks,
}: {
  value: CreatingQuizBlock;
  onChange: (block: CreatingQuizBlock) => void;
  createBlockCallback: (blockId: QuizBlockId) => void;
  blocks: CreatingQuizBlock[];
}) => {
  const addEmptyOption = () => {
    const emptyOption: UnbranchedAnswerChoice = {
      id: (value.payload?.options || []).length,
      text: '',
      score: 0,
    };
    onChange({
      ...value,
      payload: {
        ...value.payload,
        options: [...((value.payload as BlockFreeAnswerPayload)?.options || []), emptyOption],
      } as BlockFreeAnswerPayload,
    });
  };

  const chooseBlock = (blockId: QuizBlockId) => {
    onChange({
      ...value,
      payload: { ...value.payload, nextBlock: blockId } as BlockFreeAnswerPayload,
    });
  };

  const changeOption = (newOption: UnbranchedAnswerChoice) => {
    onChange({
      ...value,
      payload: {
        ...value.payload,
        options: value.payload?.options.map((opt) => (opt.id === newOption.id ? newOption : opt)),
      } as BlockFreeAnswerPayload,
    });
  };

  return (
    <Box sx={{ padding: '10px', backgroundColor: '#f1f1f1' }}>
      {value.payload && (
        <>
          <div style={{ marginBottom: '10px' }}>
            <NextBlockChooser
              blockId={value.id}
              currentNextBlockId={(value.payload as BlockFreeAnswerPayload).nextBlock || ''}
              blocks={blocks}
              createBlockCallback={function (blockId: QuizBlockId): void {
                throw new Error('Function not implemented.');
              }}
              onChooseBlock={chooseBlock}
            />
          </div>
          {value.payload?.options.map((opt) => (
            <Card sx={{ marginBottom: '10px' }} key={opt.id}>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Вариант ответа
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Текст"
                      value={opt.text}
                      sx={{ width: '100%' }}
                      onChange={(e) => changeOption({ ...opt, text: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Кол-во очков за ответ"
                      value={opt.score}
                      sx={{ width: '100%' }}
                      type="number"
                      inputProps={{ min: '0', max: '1', step: '0.1' }}
                      onChange={(e) =>
                        changeOption({
                          ...opt,
                          score: Number(e.target.value),
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </>
      )}
      <Button variant="contained" onClick={() => addEmptyOption()}>
        Добавить варинат ответа
      </Button>
    </Box>
  );
};
