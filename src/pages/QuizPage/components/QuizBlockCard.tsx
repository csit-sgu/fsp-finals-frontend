import { Box } from '@mui/material';
import { Block, BlockId, BlockType } from '../QuizModels';
import { BlockCheckbox } from './BlockCheckbox';
import { BlockDescription } from './BlockDescription';
import { BlockRadio } from './BlockRadio';
import { BlockTextfield } from './BlockTextfield';
import { useState } from 'react';

export interface QuizBlockCardProps {
  block: Block;
  onSubmit: (blockId: BlockId) => void;
}

export const QuizBlockCard = ({ block, onSubmit }: QuizBlockCardProps) => {
  const [lock, setLock] = useState<boolean>(false);

  let blockCard;

  const onClick = () => {
    setLock(true);
    onSubmit(block.id);
  };

  switch (block.block_type) {
    case BlockType.Case:
      blockCard = <BlockRadio lock={lock} submitCallback={onClick} />;
      break;
    case BlockType.MultipleChoice:
      blockCard = <BlockCheckbox lock={lock} submitCallback={onClick} />;
      break;
    case BlockType.FreeAnswer:
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
