import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { NextBlockChooser } from './NextBlockChooser';
import { BranchedAnswerChoice, CreatingQuizBlock, QuizBlockId } from '../CreatingQuizModels';

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
  const addEmptyOption = () => {
    const emptyOption: BranchedAnswerChoice = {
      id: (value.payload?.options || []).length,
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
              <Grid item xs={2}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Текст"
                  value={opt.text}
                  onChange={(e) =>
                    changeOption({ ...(opt as BranchedAnswerChoice), text: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={2}>
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
              <Grid item xs={8}>
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
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" onClick={() => addEmptyOption()}>
        Добавить варинат ответа
      </Button>
    </Box>
  );
};
