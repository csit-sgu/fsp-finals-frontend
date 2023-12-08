import Box from '@mui/material/Box';
import { useState } from 'react';
import { BlockRadio } from './BlockRadio';
import { BlockDescription } from './BlockDescription';
import { BlockTextfield } from './BlockTextfield';
import { BlockCheckbox } from './BlockCheckbox';

enum QuestionState {
  Answering,
  Sending,
  Locked,
}

// TODO: add types
function createSubmitCallback(onSubmit: any, setStateCallback: any, state: any) {
  return () => {
    onSubmit(0, BlockType.Checkbox, 'hello');
    setStateCallback(state);
  };
}

export enum BlockType {
  Radio,
  Checkbox,
  Textfield,
}

// TODO: add types
export const ScriptBlock = ({ blockType, onSubmit }: any) => {
  const [qState, setQState] = useState(QuestionState.Answering);

  let block;
  switch (blockType) {
    case BlockType.Radio:
      block = (
        <BlockRadio
          lock={qState !== QuestionState.Answering}
          submitCallback={createSubmitCallback(onSubmit, setQState, QuestionState.Locked)}
        />
      );
      break;
    case BlockType.Checkbox:
      block = (
        <BlockCheckbox
          lock={qState !== QuestionState.Answering}
          submitCallback={createSubmitCallback(onSubmit, setQState, QuestionState.Locked)}
        />
      );
      break;
    case BlockType.Textfield:
      block = (
        <BlockTextfield
          lock={qState !== QuestionState.Answering}
          submitCallback={createSubmitCallback(onSubmit, setQState, QuestionState.Locked)}
        />
      );
      break;
  }

  return (
    <Box>
      <BlockDescription />
      <br />
      {block}
    </Box>
  );
};
