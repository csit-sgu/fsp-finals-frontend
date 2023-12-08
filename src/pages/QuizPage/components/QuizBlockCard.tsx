import { Box } from '@mui/material';
import { QuizBlock, QuizBlockId, QuizBlockType } from '../QuizModels';
import { BlockCheckbox } from './BlockCheckbox';
import { BlockDescription } from './BlockDescription';
import { BlockRadio } from './BlockRadio';
import { BlockTextfield } from './BlockTextfield';
import { useState } from 'react';

export interface QuizBlockCardProps {
  block: QuizBlock;
  onSubmit: (blockId: QuizBlockId) => void;
}

export const QuizBlockCard = ({ block, onSubmit }: QuizBlockCardProps) => {
  const [lock, setLock] = useState<boolean>(false);

  let blockCard;

  const onClick = () => {
    setLock(true);
    onSubmit(block.id);
  };

  switch (block.blockType) {
    case QuizBlockType.Case:
      blockCard = <BlockRadio lock={lock} submitCallback={onClick} />;
      break;
    case QuizBlockType.MultipleChoice:
      blockCard = <BlockCheckbox lock={lock} submitCallback={onClick} />;
      break;
    case QuizBlockType.FreeAnswer:
      blockCard = <BlockTextfield lock={lock} submitCallback={onClick} />;
      break;
  }

  return (
    <Box>
      <BlockDescription />
      {blockCard}
    </Box>
  );
};
