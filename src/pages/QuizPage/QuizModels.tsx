export type QuizId = string | number;
export type BlockId = string | number | null;
export type AuthorId = string | number;

export interface QuizBackend {
  quiz_id: QuizId;
  title: string;
  author_id: AuthorId;
  description: string;
  category: string;
  entry_id: BlockId;
  // TODO: change to enum
  age_group: string;
  // TODO: change to enum
  complexity: number;
}

export interface BasicOption {
  score: number;
}

export interface BranchedOption {
  score: number;
  next_block: BlockId;
}

export interface FreeAnswerPayload {
  options: { [text: string]: BasicOption };
  next_block: BlockId;
}

export interface MultichoicePayload {
  options: { [text: string]: BasicOption };
  next_block: BlockId;
}

export interface CasePayload {
  options: { [text: string]: BranchedOption };
}

export interface Block {
  block_id: BlockId;
  block_type: BlockType;
  problem: string;
  payload: FreeAnswerPayload | MultichoicePayload | CasePayload;
}

export enum BlockType {
  MultipleChoice,
  FreeAnswer,
  Case,
}

export const blockTypeFromString = (blockName: string): BlockType | null => {
  switch (blockName) {
    case 'multiple_choice':
      return BlockType.MultipleChoice;
    case 'free_answer':
      return BlockType.FreeAnswer;
    case 'case':
      return BlockType.Case;
  }
  return null;
};
