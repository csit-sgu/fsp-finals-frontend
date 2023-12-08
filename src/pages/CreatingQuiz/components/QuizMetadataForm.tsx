import { Box, TextField } from '@mui/material';
import { QuizMetadata } from '../CreatingQuizModels';

export interface QuizMetadataFormProps {
  value: QuizMetadata;
  onChange: (quizMetadata: QuizMetadata) => void;
}

// TODO: Bind fields
export const QuizMetadataForm = ({ value, onChange }: QuizMetadataFormProps) => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Название"
          sx={{ marginBottom: '5px' }}
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
        <TextField
          label="Описание"
          sx={{ marginBottom: '5px' }}
          multiline
          rows={3}
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
        />
        <TextField
          label="Категория"
          value={value.category}
          onChange={(e) => onChange({ ...value, category: e.target.value })}
        />
      </Box>
    </>
  );
};
