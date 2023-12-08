import { Button, FormControl, FormLabel, InputLabel, MenuItem, Select } from '@mui/material';
import { CreatingQuizBlock, QuizBlockId } from '../CreatingQuizModels';

export interface NextBlockChooserProps {
  blockId: QuizBlockId;
  currentNextBlockId: QuizBlockId;
  blocks: CreatingQuizBlock[];
  createBlockCallback: (blockId: QuizBlockId) => void;
  onChooseBlock: (blockId: QuizBlockId) => void;
}

export const NextBlockChooser = ({
  blockId,
  blocks,
  currentNextBlockId,
  // createBlockCallback,
  onChooseBlock,
}: NextBlockChooserProps) => {
  return (
    <>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="next-block-chooser-label">Выбрать следующий вопрос</InputLabel>
        <Select
          sx={{ width: '100%' }}
          value={currentNextBlockId}
          labelId="next-block-chooser-label"
          label="Выбрать следующий вопрос"
          onChange={(e) => onChooseBlock(e.target.value)}
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
          {blocks
            .filter((b) => b.id !== blockId)
            .map((b) => (
              <MenuItem value={b.id} key={b.id}>
                {b.problem}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {/* <Button onClick={() => createBlockCallback(blockId)}>
        Создать новый вопрос и выбрать его
      </Button> */}
    </>
  );
};
