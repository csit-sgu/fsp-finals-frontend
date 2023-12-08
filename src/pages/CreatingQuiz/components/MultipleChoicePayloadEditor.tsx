import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import {
  BlockMultipleChoicePayload,
  CreatingQuizBlock,
  QuizBlockId,
  UnbranchedAnswerChoice,
} from '../CreatingQuizModels';
import { NextBlockChooser } from './NextBlockChooser';
import { useState } from 'react';

export const MultipleChoicePayloadEditor = ({
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
  const [lastId, setLastId] = useState(0);

  const addEmptyOption = () => {
    const emptyOption: UnbranchedAnswerChoice = {
      id: lastId,
      text: '',
      score: 0,
    };
    onChange({
      ...value,
      payload: {
        ...value.payload,
        options: [...((value.payload as BlockMultipleChoicePayload)?.options || []), emptyOption],
      } as BlockMultipleChoicePayload,
    });
    setLastId((i) => i + 1);
  };

  const chooseBlock = (blockId: QuizBlockId) => {
    onChange({
      ...value,
      payload: { ...value.payload, nextBlock: blockId } as BlockMultipleChoicePayload,
    });
  };

  const changeOption = (newOption: UnbranchedAnswerChoice) => {
    onChange({
      ...value,
      payload: {
        ...value.payload,
        options: value.payload?.options.map((opt) => (opt.id === newOption.id ? newOption : opt)),
      } as BlockMultipleChoicePayload,
    });
  };

  const removeOption = (optionId: number) => {
    onChange({
      ...value,
      payload: {
        ...value.payload,
        options: value.payload?.options.filter((opt) => opt.id !== optionId),
      } as BlockMultipleChoicePayload,
    });
  };

  return (
    <Box sx={{ padding: '10px', backgroundColor: '#f1f1f1' }}>
      {value.payload && (
        <>
          <div style={{ marginBottom: '10px' }}>
            <NextBlockChooser
              blockId={value.id}
              currentNextBlockId={(value.payload as BlockMultipleChoicePayload).nextBlock || ''}
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      label="Текст"
                      value={opt.text}
                      sx={{ width: '100%' }}
                      onChange={(e) => changeOption({ ...opt, text: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
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
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginTop: '10px' }}
                  onClick={() => removeOption(opt.id)}
                >
                  Удалить варинат ответа
                </Button>
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
