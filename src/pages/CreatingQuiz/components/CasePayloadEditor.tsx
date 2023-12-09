import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { NextBlockChooser } from './NextBlockChooser';
import { BranchedAnswerChoice, CreatingQuizBlock, QuizBlockId } from '../CreatingQuizModels';
import { useState } from 'react';

export const CasePayloadEditor = ({
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
    const emptyOption: BranchedAnswerChoice = {
      id: lastId,
      text: '',
      score: 0,
      nextBlock: '',
    };
    onChange({
      ...value,
      payload: {
        ...value.payload,
        options: [...((value.payload?.options as BranchedAnswerChoice[]) || []), emptyOption],
      },
    });
    setLastId((i) => i + 1);
  };

  const removeOption = (optionId: number) => {
    onChange({
      ...value,
      payload: {
        ...value.payload,
        options: value.payload?.options.filter(
          (opt) => opt.id !== optionId,
        ) as BranchedAnswerChoice[],
      },
    });
  };

  const changeOption = (newOption: BranchedAnswerChoice) => {
    onChange({
      ...value,
      payload: {
        ...value.payload,
        options: (value.payload?.options as BranchedAnswerChoice[]).map((opt) =>
          opt.id === newOption.id ? newOption : opt,
        ),
      },
    });
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f1f1f1' }}>
      {value.payload?.options.map((opt) => (
        <Card sx={{ marginBottom: '10px' }} key={opt.id}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
              Вариант ответа
            </Typography>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Текст"
                  value={opt.text}
                  onChange={(e) =>
                    changeOption({ ...(opt as BranchedAnswerChoice), text: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Кол-во очков за ответ"
                  value={opt.score}
                  onChange={(e) =>
                    changeOption({
                      ...(opt as BranchedAnswerChoice),
                      score: Number(e.target.value),
                    })
                  }
                  type="number"
                  inputProps={{ min: '0', max: '1', step: '0.1' }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <NextBlockChooser
                  blockId={value.id}
                  currentNextBlockId={(opt as BranchedAnswerChoice).nextBlock || ''}
                  blocks={blocks}
                  createBlockCallback={createBlockCallback}
                  onChooseBlock={(blockId) =>
                    changeOption({ ...(opt as BranchedAnswerChoice), nextBlock: blockId })
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
      <Button variant="contained" onClick={() => addEmptyOption()}>
        Добавить варинат ответа
      </Button>
    </Box>
  );
};
