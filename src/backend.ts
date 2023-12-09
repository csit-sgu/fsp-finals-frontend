import { BlockId, ContainerPayload, QuizId } from './pages/QuizPage/QuizModels';
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

// TODO: add explicit type
export const postAttempt = async (attempt: any) => {
  return axios.post(`${BACKEND_URL}/attempt`, attempt, { withCredentials: true });
};

export const deployContainer = async (blockId: BlockId, payload: ContainerPayload) => {
  return axios.post(
    `${BACKEND_URL}/container/${blockId}`,
    { payload: payload },
    { withCredentials: true },
  );
};

export const validateContainer = async (blockId: BlockId, code: string) => {
  return axios.post(
    `${BACKEND_URL}/container/${blockId}/validate`,
    { answer: code },
    { withCredentials: true },
  );
};
