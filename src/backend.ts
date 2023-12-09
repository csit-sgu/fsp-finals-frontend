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

export async function getUser(): Promise<{
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
