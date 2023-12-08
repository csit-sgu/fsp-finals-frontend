export type QuizId = string | number;
export type BlockId = string | number | null;
export type AuthorId = string | number;

export interface QuizBackend {
  author_id: AuthorId;
  category: string;
  description: string;
  entry_id: BlockId;
  title: string;
}

export interface BasicOption {
  text: string;
  score: number;
}

export interface BranchedOption {
  text: string;
  score: number;
  next_block: BlockId;
}

export interface FreeAnswerPayload {
  options: BasicOption[];
  next_block: BlockId;
}

export interface MultichoicePayload {
  options: BasicOption[];
  next_block: BlockId;
}

export interface CasePayload {
  options: BranchedOption[];
}

export interface Block {
  id: BlockId;
  block_type: BlockType;
  problem: string;
  payload: FreeAnswerPayload | MultichoicePayload | CasePayload;
}

export interface Quiz {
  id: QuizId;
  name: string;
  theme: string;
  description: string;
  blocks: Block[];
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
