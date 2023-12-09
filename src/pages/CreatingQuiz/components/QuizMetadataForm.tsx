import { Box, FormControl, InputLabel, MenuItem, Rating, Select, TextField } from '@mui/material';
import { QuizMetadata } from '../CreatingQuizModels';
import { AgeGroup, Category, Complexity } from '../types';

export interface QuizMetadataFormProps {
  value: QuizMetadata;
  onChange: (quizMetadata: QuizMetadata) => void;
}

export const QuizMetadataForm = ({ value, onChange }: QuizMetadataFormProps) => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Название"
          sx={{ marginBottom: '15px' }}
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
        <TextField
          label="Описание"
          sx={{ marginBottom: '15px' }}
          multiline
          rows={3}
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
        />
        <FormControl sx={{ marginBottom: '15px' }}>
          <InputLabel id="select-category-label">Категория</InputLabel>
          <Select
            labelId="select-category-label"
            value={value.category}
            label="Категория"
            onChange={(e) =>
              onChange({
                ...value,
                category: e.target.value as Category,
              })
            }
          >
            <MenuItem value="finance">Финансы</MenuItem>
            <MenuItem value="personal_data">Персональные данные</MenuItem>
            <MenuItem value="devices_security">Безопасность устройств</MenuItem>
            <MenuItem value="web">Веб-технологии</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginBottom: '15px' }}>
          <InputLabel id="select-age-group-label">Возрастная категория</InputLabel>
          <Select
            labelId="select-age-group-label"
            value={value.ageGroup}
            label="Возрастная категория"
            onChange={(e) =>
              onChange({
                ...value,
                ageGroup: e.target.value as AgeGroup,
              })
            }
          >
            <MenuItem value="child">Дети</MenuItem>
            <MenuItem value="teen">Подростки</MenuItem>
            <MenuItem value="adult">Взрослые</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ marginBottom: '15px' }}>
          <InputLabel id="select-complexity-label">Сложность</InputLabel>
          <Select
            labelId="select-complexity-label"
            value={value.complexity}
            label="Сложность"
            onChange={(e) =>
              onChange({
                ...value,
                complexity: Number(e.target.value) as Complexity,
              })
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
