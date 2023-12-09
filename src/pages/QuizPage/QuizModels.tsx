export type QuizId = string | number;
export type BlockId = string | number | null;
export type AuthorId = string | number;

// {
//   "quiz_id": "0069cedf-1149-4073-a6bb-991dc4b16ca7",
//   "title": "Aboba quiz",
//   "author_id": "e3129b36-d325-4465-a4ab-d59b79ffb323",
//   "description": "This quiz will check your knowledge of aboba",
//   "category": "web",
//   "entry_id": "dce15e45-3929-41db-8d3b-03cf58601e7e",
//   "age_group": "adult",
//   "complexity": 3
// }

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
