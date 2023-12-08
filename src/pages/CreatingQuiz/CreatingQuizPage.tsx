import { Button, Container, Typography } from '@mui/material';
import { CreatingQuizBlock, QuizBlockId, QuizMetadata } from './CreatingQuizModels';
import { useEffect, useRef, useState } from 'react';
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
  const [lastId, setLastId] = useState<number>(2);

  const storageStateLoaded = useRef(false);

  useEffect(() => {
    const draftQuizMetadata = localStorage.getItem('quizMetadata');
    const draftBlocks = localStorage.getItem('blocks');
    if (draftBlocks && draftQuizMetadata) {
      setQuizMetadata(JSON.parse(draftQuizMetadata));
      console.dir(JSON.parse(draftBlocks));
      setBlocks(JSON.parse(draftBlocks));
      storageStateLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    if (storageStateLoaded.current) {
      storageStateLoaded.current = false;
      return;
    }

    localStorage.setItem('quizMetadata', JSON.stringify(quizMetadata));
    localStorage.setItem('blocks', JSON.stringify(blocks));
  }, [quizMetadata, blocks]);

  const changeBlock = (newBlock: CreatingQuizBlock) => {
    setBlocks((oldBlocks) =>
      oldBlocks.map((oldBlock) => (oldBlock.id === newBlock.id ? newBlock : oldBlock)),
    );
  };

  const addNewBlock = () => {
    setBlocks((oldBlocks) => [...oldBlocks, createEmptyBlock(lastId)]);
    setLastId((i) => i + 1);
  };

  const removeBlock = (blockId: QuizBlockId) => {
    setBlocks((oldBlocks) => oldBlocks.filter((b) => b.id !== blockId));
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h2">Создать квиз</Typography>
      <div style={{ marginBottom: '10px' }}>
        <QuizMetadataForm value={quizMetadata} onChange={setQuizMetadata} />
      </div>
      <Typography variant="h3">Вопросы</Typography>
      {blocks.map((b) => (
        <div style={{ marginBottom: '10px' }}>
          <BlockItem
            value={b}
            onChange={changeBlock}
            key={b.id}
            blocks={blocks}
            onRemove={removeBlock}
          />
        </div>
      ))}
      <Button
        variant="outlined"
        size="large"
        sx={{ width: '100%', marginBottom: '10px' }}
        onClick={() => addNewBlock()}
      >
        Добавить вопрос
      </Button>
      <Button variant="outlined" size="large" sx={{ width: '100%' }} color="success">
        Создать квиз
      </Button>
    </Container>
  );
};
