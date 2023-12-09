import { useState } from 'react';
import { Container } from '@mui/system';
import { Block, QuizBackend, BlockId, QuizId, blockTypeFromString } from './QuizModels';
import { QuizAboutCard } from './components/QuizAboutCard';
import { QuizBlockCard } from './components/QuizBlockCard';
import { Bar } from '../Bar';
import { useParams } from 'react-router-dom';
import { getBlock, getQuiz } from '../../backend';
import * as React from 'react';

export const QuizPage = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [quiz, setQuiz] = useState<QuizBackend | null>(null);
  const [answers, setAnswers] = useState<[BlockId, string | string[]][]>([]);
  const params = useParams();

  const getNextBlock = (nextId: BlockId) => {
    if (nextId !== null) {
      getBlock(nextId).then((res) => {
        const block_resp = res.data;
        // TODO: check for null
        block_resp.block_type = blockTypeFromString(block_resp.block_type);
        block_resp.payload = JSON.parse(block_resp.payload);
        const block: Block = block_resp;
        console.log(block);
        setBlocks([...blocks, block]);
      });
    } else {
      // TODO: send answers as attempt to backend
      console.log('QUIZ ENDED');
      console.log('RESULTS', answers);
    }
  };

  if (quiz === null) {
    getQuiz(params.quizId).then((res) => {
      const quiz: QuizBackend = res.data;
      setQuiz(quiz);
    });
  }

  const startQuiz = () => {
    getNextBlock(quiz?.entry_id);
  };

  const onSubmit = (currentId: BlockId, nextId: BlockId, value: string | string[]) => {
    console.log('SAVED', [currentId, value]);
    setAnswers([...answers, [currentId, value]]);
    getNextBlock(nextId);
  };

  return (
    <React.Fragment>
      <Bar>
        <Container maxWidth="sm">
          <QuizAboutCard
            name={quiz?.title}
            theme={quiz?.category}
            description={quiz?.description}
            startCallback={startQuiz}
          />
          <br />
          {blocks.map((b, idx) => (
            <QuizBlockCard block={b} onSubmit={onSubmit} key={idx} />
          ))}
        </Container>
      </Bar>
    </React.Fragment>
  );
};
