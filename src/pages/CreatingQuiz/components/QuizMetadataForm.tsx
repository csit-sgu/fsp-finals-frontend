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
        <TextField label="Название" sx={{ marginBottom: '5px' }} />
        <TextField label="Описание" sx={{ marginBottom: '5px' }} multiline rows={3} />
        <TextField label="Категория" />
      </Box>
    </>
  );
};
