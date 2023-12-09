import { BlockId, QuizId } from './pages/QuizPage/QuizModels';
import { BACKEND_URL } from './config';
import axios from 'axios';

export const getQuiz = async (id: QuizId) => {
  return axios.get(`${BACKEND_URL}/quiz/${id}`);
};

export const getBlock = async (id: BlockId) => {
  return axios.get(`${BACKEND_URL}/block/${id}`);
};

export const getQuizList = async () => {
  return axios.get(`${BACKEND_URL}/quiz`);
};

export const getUser = async () => {
  return axios.get(`${BACKEND_URL}/me`, { withCredentials: true });
};

// TODO: add explicit type
export const postAttempt = async (attempt: any) => {
  return axios.post(`${BACKEND_URL}/attempt`, attempt, { withCredentials: true });
};
