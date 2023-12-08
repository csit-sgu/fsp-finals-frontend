export type QuizId = string | number;
export type QuizBlockId = string | number;

export interface Quiz {
  id: QuizId;
  name: string;
  theme: string;
  description: string;
  blocks: QuizBlock[];
}

export interface QuizBlock {
  id: QuizBlockId;
  problem: string;
  blockType: QuizBlockType;
  payload: BlockMultipleChoicePayload | BlockFreeAnswerPayload | BlockCasePayload;
}

export enum QuizBlockType {
  MultipleChoice,
  FreeAnswer,
  Case,
}

export interface BlockMultipleChoicePayload {
  options: UnbranchedAnswerChoice[];
  nextBlock: QuizBlockId;
}

export interface BlockFreeAnswerPayload {
  options: PossibleFreeAnswer[];
  nextBlock: QuizBlockId;
}

export interface BlockCasePayload {
  options: BranchedAnswerChoice[];
}

export interface UnbranchedAnswerChoice {
  text: string;
  score: number;
}

export interface BranchedAnswerChoice {
  text: string;
  score: number;
  nextBlock: QuizBlockId;
}

export interface PossibleFreeAnswer {
  text: string;
  score: number;
}
