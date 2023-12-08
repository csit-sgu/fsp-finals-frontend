import { useState } from 'react';
import { Container } from '@mui/system';
import { Block, QuizBackend, BlockId, QuizId, blockTypeFromString } from './QuizModels';
import { QuizAboutCard } from './components/QuizAboutCard';
import { QuizBlockCard } from './components/QuizBlockCard';
import { Bar } from '../Bar';
import axios from 'axios';
import * as React from 'react';

const quizTheme = 'Финансовые нарушения, Защита персональных данных';
const quizDescritption = 'Description...';

const getQuiz = async (id: QuizId) => {
  // TODO: add backend url
  return axios.get(`http://localhost:8000/quiz/${id}`);
};

const getBlock = async (id: BlockId) => {
  // TODO: add backend url
  return axios.get(`http://localhost:8000/block/${id}`);
};

export const QuizPage = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const getNextBlock = (currentId: BlockId) => {
    console.log('CURRENTID', currentId);
    if (currentId !== null) {
      getBlock(currentId).then((res) => {
        const block_resp = res.data;
        // TODO: check for null
        block_resp.block_type = blockTypeFromString(block_resp.block_type);
        const block: Block = block_resp;
        console.log(block);
        setBlocks([...blocks, block]);
      });
    } else {
      console.log('QUIZ ENDED');
    }
  };

  const startQuiz = (id: QuizId) => {
    getQuiz(id).then((res) => {
      const quiz: QuizBackend = res.data;
      getNextBlock(quiz.entry_id);
    });
  };

  return (
    <React.Fragment>
      <Bar>
        <Container maxWidth="sm">
          <QuizAboutCard
            id={1}
            name="Aboba"
            theme={quizTheme}
            description={quizDescritption}
            startCallback={startQuiz}
          />
          {blocks.map((b, idx) => (
            <QuizBlockCard block={b} onSubmit={getNextBlock} key={idx} />
          ))}
        </Container>
      </Bar>
    </React.Fragment>
  );
};
