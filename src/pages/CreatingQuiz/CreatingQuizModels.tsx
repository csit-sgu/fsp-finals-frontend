export type QuizId = string | number;
export type QuizBlockId = string | number;

export interface QuizMetadata {
  title: string;
  description: string;
  category: 'finance' | 'personal_data' | 'devices_security' | 'web';
}

export type QuizBlockType = 'MULTIPLE_CHOICE' | 'FREE_ANSWER' | 'CASE' | '';

export interface CreatingQuizBlock {
  id: QuizBlockId;
  problem: string;
  type: QuizBlockType;
  payload: BlockMultipleChoicePayload | BlockFreeAnswerPayload | BlockCasePayload | null;
}

export interface BlockMultipleChoicePayload {
  options: UnbranchedAnswerChoice[];
  nextBlock: QuizBlockId | null;
}

export interface BlockFreeAnswerPayload {
  options: UnbranchedAnswerChoice[];
  nextBlock: QuizBlockId | null;
}

export interface BlockCasePayload {
  options: BranchedAnswerChoice[];
}

export interface UnbranchedAnswerChoice {
  id: number;
  text: string;
  score: number;
}

export interface BranchedAnswerChoice {
  id: number;
  text: string;
  score: number;
  nextBlock: QuizBlockId | null;
}
