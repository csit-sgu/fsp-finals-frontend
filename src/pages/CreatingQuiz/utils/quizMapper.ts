import {
  BlockCasePayload,
  BlockFreeAnswerPayload,
  BlockMultipleChoicePayload,
  CreatingQuizBlock,
  QuizMetadata,
} from '../CreatingQuizModels';
import { AgeGroup, Category, Complexity } from '../types';

export interface FrontendQuizDto {
  quizMetadata: QuizMetadata;
  blocks: CreatingQuizBlock[];
  username: string;
}

export interface BackendQuizDto {
  title: string;
  author_username: string;
  description: string;
  category: Category;
  complexity: Complexity;
  age_group: AgeGroup;
  blocks: BackendQuizBlock[];
}

export type BlockType = 'multiple_choice' | 'free_answer' | 'case';

export interface BackendQuizBlock {
  block_id: number | string;
  block_type: BlockType;
  problem: string;
  payload: MultipleChoiceBlockPayload | FreeAnswerBlockPayload | CaseBlockPayload;
}

export interface MultipleChoiceBlockPayload {
  options: MultipleChoiceBlockOptions;
  next_block: number | string | null;
}

export type MultipleChoiceBlockOptions = {
  [optionText: string]: {
    score: number;
  };
};

export interface FreeAnswerBlockPayload {
  options: FreeAnswerBlockOptions;
  next_block: number | string | null;
}

export type FreeAnswerBlockOptions = {
  [optionText: string]: {
    score: number;
  };
};

export interface CaseBlockPayload {
  options: CaseBlockOptions;
}

export type CaseBlockOptions = {
  [optionText: string]: {
    score: number;
    next_block: number | string | null;
  };
};

export function mapFrontendQuizToBackend(frontendDto: FrontendQuizDto): BackendQuizDto {
  const result: BackendQuizDto = {
    title: frontendDto.quizMetadata.title,
    author_username: frontendDto.username,
    description: frontendDto.quizMetadata.description,
    category: frontendDto.quizMetadata.category,
    complexity: frontendDto.quizMetadata.complexity,
    age_group: frontendDto.quizMetadata.ageGroup,
    blocks: [],
  };

  for (const block of frontendDto.blocks) {
    let blockType: BlockType | undefined;
    let payload;

    if (block.type === 'CASE') {
      const mappedCaseOptions: CaseBlockOptions = {};
      for (const opt of (block.payload as BlockCasePayload).options) {
        mappedCaseOptions[opt.text] = {
          score: opt.score,
          next_block: opt.nextBlock,
        };
      }
      payload = {
        options: mappedCaseOptions,
      };

      blockType = 'case';
    } else if (block.type === 'FREE_ANSWER') {
      const mappedFreeAnswerOptions: FreeAnswerBlockOptions = {};
      for (const opt of (block.payload as BlockFreeAnswerPayload).options) {
        mappedFreeAnswerOptions[opt.text] = {
          score: opt.score,
        };
      }
      payload = {
        options: mappedFreeAnswerOptions,
      };
      blockType = 'free_answer';
    } else if (block.type === 'MULTIPLE_CHOICE') {
      const mappedFreeAnswerOptions: MultipleChoiceBlockOptions = {};
      for (const opt of (block.payload as BlockMultipleChoicePayload).options) {
        mappedFreeAnswerOptions[opt.text] = {
          score: opt.score,
        };
      }
      payload = {
        options: mappedFreeAnswerOptions,
      };
      blockType = 'multiple_choice';
    }

    if (!blockType) {
      throw new Error('blockType undefined');
    }

    if (!payload) {
      throw new Error('payload undefined');
    }

    const mappedBlock: BackendQuizBlock = {
      block_id: block.id,
      block_type: blockType,
      problem: block.problem,
      payload: payload as MultipleChoiceBlockPayload | FreeAnswerBlockPayload | CaseBlockPayload,
    };

    result.blocks.push(mappedBlock);
  }

  return result;
}
