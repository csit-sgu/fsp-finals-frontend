import { BlockId, QuizId } from './pages/QuizPage/QuizModels';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

export const getQuiz = async (id: QuizId) => {
  // TODO: add backend url
  return axios.get(`${BACKEND_URL}/quiz/${id}`);
};

export const getBlock = async (id: BlockId) => {
  // TODO: add backend url
  return axios.get(`${BACKEND_URL}/block/${id}`);
};

export const getQuizList = async () => {
  // TODO: add backend url
  return axios.get(`${BACKEND_URL}/quiz`);
};

export const getFilteredQuizList = async (
  ageGroup: string | null,
  category: string | null,
  complexity: string | null,
) => {
  // TODO: add backend url
  return axios.get(`${BACKEND_URL}/quiz`, {
    params: { age_group: ageGroup, category, complexity },
  });
};
