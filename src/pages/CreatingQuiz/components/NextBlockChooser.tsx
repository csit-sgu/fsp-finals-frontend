import { Button, MenuItem, Select } from '@mui/material';
import { CreatingQuizBlock, QuizBlockId } from '../CreatingQuizModels';

export interface NextBlockChooserProps {
  blockId: QuizBlockId;
  currentNextBlockId: QuizBlockId;
  blocks: CreatingQuizBlock[];
  createBlockCallback: (blockId: QuizBlockId) => void;
}

export const NextBlockChooser = ({
  blockId,
  blocks,
  currentNextBlockId,
  createBlockCallback,
}: NextBlockChooserProps) => {
  return (
    <>
      <Select value={currentNextBlockId}>
        <MenuItem value="">
          <em>Не выбрано</em>
        </MenuItem>
        {blocks.map((b) => (
          <MenuItem value={b.id} key={b.id}>
            {b.problem}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={() => createBlockCallback(blockId)}>Создать кнопку и выбрать его</Button>
    </>
  );
};
