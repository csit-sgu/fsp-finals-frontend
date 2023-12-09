import { Box } from '@mui/material';
import {
  Block,
  BlockId,
  BlockType,
  CasePayload,
  ContainerPayload,
  FreeAnswerPayload,
  MultichoicePayload,
} from '../QuizModels';
import { BlockCheckbox } from './BlockCheckbox';
import { BlockDescription } from './BlockDescription';
import { BlockRadio } from './BlockRadio';
import { BlockTextfield } from './BlockTextfield';
import { useState } from 'react';
import { BlockContainerCode } from './BlockContainerCode';

export interface QuizBlockCardProps {
  block: Block;
  onSubmit: (currentId: BlockId, nextId: BlockId, value: string | string[]) => void;
}

export const QuizBlockCard = ({ block, onSubmit }: QuizBlockCardProps) => {
  const [lock, setLock] = useState<boolean>(false);

  let blockCard;

  const submit = (nextId: BlockId, value: string | string[]) => {
    setLock(true);
    onSubmit(block.block_id, nextId, value);
  };

  switch (block.block_type) {
    case BlockType.Case:
      blockCard = (
        <BlockRadio lock={lock} payload={block.payload as CasePayload} onSubmit={submit} />
      );
      break;
    case BlockType.MultipleChoice:
      blockCard = (
        <BlockCheckbox
          lock={lock}
          payload={block.payload as MultichoicePayload}
          onSubmit={submit}
        />
      );
      break;
    case BlockType.FreeAnswer:
      blockCard = (
        <BlockTextfield
          lock={lock}
          payload={block.payload as FreeAnswerPayload}
          onSubmit={submit}
        />
      );
      break;
    case BlockType.Container:
      blockCard = (
        <BlockContainerCode
          block_id={block.block_id}
          lock={lock}
          payload={block.payload as ContainerPayload}
          onSubmit={submit}
        />
      );
      break;
  }

  return (
    <Box>
      <BlockDescription text={block.problem} />
      {blockCard}
      <br />
    </Box>
  );
};
