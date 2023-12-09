import { Button, Container, Typography } from '@mui/material';
import { CreatingQuizBlock, QuizBlockId, QuizMetadata } from './CreatingQuizModels';
import { useEffect, useRef, useState } from 'react';
import { QuizMetadataForm } from './components/QuizMetadataForm';
import { BlockItem } from './components/BlockItem';
import { BackendQuizDto, mapFrontendQuizToBackend } from './utils/quizMapper';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { Bar } from '../Bar';

async function getUser(): Promise<{
  username: string;
  is_admin: boolean;
  name: string;
  surname: string;
} | null> {
  try {
    const user = await axios.get(`${BACKEND_URL}/me`, { withCredentials: true });
    return user.data;
  } catch (e) {
    return null;
  }
}

const createEmptyBlock: (id: QuizBlockId) => CreatingQuizBlock = (id) => ({
  id,
  problem: '',
  type: '',
  payload: null,
});

async function createQuiz(quiz: BackendQuizDto) {
  await axios.post(`${BACKEND_URL}/quiz`, quiz, { withCredentials: true });
}

export const CreatingQuizPage = () => {
  const [quizMetadata, setQuizMetadata] = useState<QuizMetadata>({
    title: '',
    description: '',
    category: 'devices_security',
  });

  const [blocks, setBlocks] = useState<CreatingQuizBlock[]>([createEmptyBlock(1)]);
  const [lastId, setLastId] = useState<number>(2);

  const storageStateLoaded = useRef(false);

  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  const [creatingLoading, setCreatingLoading] = useState<boolean>(false);

  useEffect(() => {
    const draftQuizMetadata = localStorage.getItem('quizMetadata');
    const draftBlocks = localStorage.getItem('blocks');
    if (draftBlocks && draftQuizMetadata) {
      setQuizMetadata(JSON.parse(draftQuizMetadata));
      console.dir(JSON.parse(draftBlocks));
      setBlocks(JSON.parse(draftBlocks));
      storageStateLoaded.current = true;
    }

    getUser().then((user) => {
      if (user?.username === null) {
        navigate('/login');
      } else if (!user?.is_admin) {
        navigate('/');
        alert('У вас нет прав на создание квизов');
      } else {
        setUsername(user?.username);
      }
    });
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

  if (!username) {
    return;
    <Bar>
      <Typography variant="h2">Авторизация...</Typography>
    </Bar>;
  }

  return (
    <Bar>
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
        <Button
          variant="outlined"
          size="large"
          sx={{ width: '100%' }}
          color="success"
          disabled={creatingLoading}
          onClick={() => {
            setCreatingLoading(true);
            createQuiz(
              mapFrontendQuizToBackend({
                quizMetadata,
                blocks,
                username,
              }),
            ).then((_) => {
              setCreatingLoading(false);
              alert('Квиз создан');
            });
          }}
        >
          Создать квиз
        </Button>
      </Container>
    </Bar>
  );
};
