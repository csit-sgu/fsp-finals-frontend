import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  BlockCasePayload,
  CreatingQuizBlock,
  QuizBlockId,
  QuizBlockType,
} from '../CreatingQuizModels';
import { CasePayloadEditor } from './CasePayloadEditor';
import { useEffect } from 'react';
import { MultipleChoicePayloadEditor } from './MultipleChoicePayloadEditor';
import { FreeAnswerPayloadEditor } from './FreeAnswerPayloadEditor';

export interface BlockItemProps {
  value: CreatingQuizBlock;
  onChange: (newBlock: CreatingQuizBlock) => void;
  blocks: CreatingQuizBlock[];
  onRemove: (blockId: QuizBlockId) => void;
}

export const BlockItem = ({ value, onChange, blocks, onRemove }: BlockItemProps) => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          value={value.problem}
          onChange={(e) => onChange({ ...value, problem: e.target.value })}
          multiline
          rows={3}
          label="Текст вопроса"
          sx={{ marginBottom: '20px' }}
        />
        <FormControl>
          <InputLabel id="select-type-label">Тип вопроса</InputLabel>
          <Select
            labelId="select-type-label"
            value={value.type}
            onChange={(e) => {
              onChange({
                ...value,
                type: e.target.value as QuizBlockType,
                payload: getEmptyPayloadForQuizType(value.type),
              });
            }}
            sx={{ marginBottom: value.type ? '20px' : '0' }}
          >
            <MenuItem value="">
              <em>Не выбрано</em>
            </MenuItem>
            <MenuItem value="CASE">С выбором одного ответа</MenuItem>
            <MenuItem value="MULTIPLE_CHOICE">С выбором некольких ответов</MenuItem>
            <MenuItem value="FREE_ANSWER">
              С произвольным ответом (вводится в текстовое поле)
            </MenuItem>
          </Select>
        </FormControl>
        {value.type === 'CASE' && (
          <CasePayloadEditor
            value={value}
            onChange={onChange}
            createBlockCallback={function (blockId: QuizBlockId): void {
              throw new Error('Function not implemented.');
            }}
            blocks={blocks}
          />
        )}
        {value.type === 'FREE_ANSWER' && (
          <FreeAnswerPayloadEditor
            value={value}
            onChange={onChange}
            createBlockCallback={function (blockId: QuizBlockId): void {
              throw new Error('Function not implemented.');
            }}
            blocks={blocks}
          />
        )}
        {value.type === 'MULTIPLE_CHOICE' && (
          <MultipleChoicePayloadEditor
            value={value}
            onChange={onChange}
            createBlockCallback={function (blockId: QuizBlockId): void {
              throw new Error('Function not implemented.');
            }}
            blocks={blocks}
          />
        )}
        <Button
          variant="outlined"
          color="error"
          sx={{ marginTop: '20px' }}
          onClick={() => onRemove(value.id)}
          disabled={blocks.length < 2}
        >
          Удалить вопрос
        </Button>
      </CardContent>
    </Card>
  );
};

const getEmptyPayloadForQuizType: (type: QuizBlockType) => BlockCasePayload | null = (type) => {
  switch (type) {
    case '':
      return null;
    case 'CASE':
      return { options: [] };
    case 'MULTIPLE_CHOICE':
      return { options: [], nextBlock: null };
    case 'FREE_ANSWER':
      return { options: [], nextBlock: null };
  }
};
