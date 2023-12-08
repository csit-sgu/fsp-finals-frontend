import { Button, Container, Typography } from '@mui/material';
import { CreatingQuizBlock, QuizBlockId, QuizMetadata } from './CreatingQuizModels';
import { useState } from 'react';
import { QuizMetadataForm } from './components/QuizMetadataForm';
import { BlockItem } from './components/BlockItem';

const createEmptyBlock: (id: QuizBlockId) => CreatingQuizBlock = (id) => ({
  id,
  problem: '',
  type: '',
  payload: null,
});

export const CreatingQuizPage = () => {
  const [quizMetadata, setQuizMetadata] = useState<QuizMetadata>({
    title: '',
    description: '',
    category: '',
  });

  const [blocks, setBlocks] = useState<CreatingQuizBlock[]>([createEmptyBlock(1)]);

  const changeBlock = (newBlock: CreatingQuizBlock) => {
    setBlocks((oldBlocks) =>
      oldBlocks.map((oldBlock) => (oldBlock.id === newBlock.id ? newBlock : oldBlock)),
    );
  };

  const addNewBlock = () => {
    setBlocks((oldBlocks) => [...oldBlocks, createEmptyBlock(oldBlocks.length + 1)]);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h2">Создать квиз</Typography>
      <div style={{ marginBottom: '10px' }}>
        <QuizMetadataForm value={quizMetadata} onChange={setQuizMetadata} />
      </div>
      <Typography variant="h3">Вопросы</Typography>
      {blocks.map((b) => (
        <div style={{ marginBottom: '5px' }}>
          <BlockItem value={b} onChange={changeBlock} key={b.id} blocks={blocks} />
        </div>
      ))}
      <Button variant="outlined" onClick={() => addNewBlock()}>
        Добавить вопрос
      </Button>
    </Container>
  );
};