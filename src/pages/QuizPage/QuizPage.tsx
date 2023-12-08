import { useState } from 'react';
import { Container } from '@mui/system';
import { QuizBlock, QuizBlockId, QuizBlockType } from './QuizModels';
import { QuizAboutCard } from './components/QuizAboutCard';
import { QuizBlockCard } from './components/QuizBlockCard';

const quizTheme = 'Финансовые нарушения, Защита персональных данных';
const quizDescritption = 'Description...';

const exampleBlock = (id: QuizBlockId) => ({
  id,
  problem: 'Aboba',
  blockType: QuizBlockType.MultipleChoice,
  payload: {
    options: [
      {
        text: 'Aboba 1',
        score: 1.0,
      },
      {
        text: 'Aboba 2',
        score: 0.7,
      },
      {
        text: 'Aboba 3',
        score: 0,
      },
    ],
    nextBlock: 2,
  },
});

export const QuizPage = () => {
  const [blocks, setBlocks] = useState<QuizBlock[]>([]);

  const addBlock = () => {
    setBlocks((b) => [...b, exampleBlock(b.length)]);
  };

  return (
    <Container maxWidth="sm">
      <QuizAboutCard
        id="1"
        name="Aboba"
        theme={quizTheme}
        description={quizDescritption}
        startCallback={addBlock}
      />
      {blocks.map((b) => (
        <QuizBlockCard block={b} onSubmit={addBlock} key={b.id} />
      ))}
    </Container>
  );
};
