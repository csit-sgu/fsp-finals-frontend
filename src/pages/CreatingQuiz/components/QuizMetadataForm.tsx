import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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
        <FormControl>
          <InputLabel id="select-category-label">Категория</InputLabel>
          <Select
            labelId="select-category-label"
            value={value.category}
            label="Категория"
            onChange={(e) =>
              onChange({
                ...value,
                category: e.target.value as
                  | 'finance'
                  | 'personal_data'
                  | 'devices_security'
                  | 'web',
              })
            }
          >
            <MenuItem value="finance">Финансы</MenuItem>
            <MenuItem value="personal_data">Персональные данные</MenuItem>
            <MenuItem value="devices_security">Безопасность устройств</MenuItem>
            <MenuItem value="web">Веб-технологии</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
