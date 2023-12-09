import { useState } from 'react';
import { Container } from '@mui/system';
import { Block, QuizBackend, BlockId, blockTypeFromString, QuizId } from './QuizModels';
import { QuizAboutCard } from './components/QuizAboutCard';
import { QuizBlockCard } from './components/QuizBlockCard';
import { Bar } from '../Bar';
import { useParams } from 'react-router-dom';
import { getBlock, getQuiz, getUser, postAttempt } from '../../backend';
import * as React from 'react';

const formatAttempt = (quizId: QuizId, result: [BlockId, string | string[]][]) => {
  return {
    quiz_id: quizId,
    username: null,
    answers: result.map(([blockId, value]) => {
      return {
        block_id: blockId,
        answer: value,
      };
    }),
  };
};

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
    }
  };

  const sendAttempt = (answers: [BlockId, string | string[]][]) => {
    console.log('QUIZ ENDED');
    console.log('RESULTS', answers);
    const attempt = formatAttempt(quiz?.quiz_id, answers);
    getUser().then((res) => {
      attempt.username = res.data.username;
      console.log('ATTEMPT', attempt);
      postAttempt(attempt).then((res) => {
        console.log('SENT ATTEMPT', res);
      });
    });
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
    if (nextId === null) {
      sendAttempt([...answers, [currentId, value]]);
      setAnswers([...answers, [currentId, value]]);
    } else {
      setAnswers([...answers, [currentId, value]]);
      getNextBlock(nextId);
    }
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
