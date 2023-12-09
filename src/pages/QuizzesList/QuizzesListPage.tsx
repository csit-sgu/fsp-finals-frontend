import { Container } from '@mui/material';
import { Bar } from '../Bar';
import { QuizCardHor } from '../../components/QuizCardHor';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getFilteredQuizList } from '../../backend';

export const QuizzesListPage = () => {
  const [searchParams] = useSearchParams();

  const ageGroup = searchParams.get('age-group');
  const category = searchParams.get('category');
  const complexity = searchParams.get('complexity');

  const [quizzes, setQuizzes] = useState<{ quiz_id: string; title: string; category: string }[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getFilteredQuizList(ageGroup, category, complexity).then((r) => {
      setQuizzes(r.data);
      setLoading(false);
    });
  }, []);

  return (
    <Bar>
      <Container maxWidth="md">
        {quizzes.map((q) => (
          <QuizCardHor key={q.quiz_id} title={q.title} category={q.category} quizId={q.quiz_id} />
        ))}
      </Container>
    </Bar>
  );
};
