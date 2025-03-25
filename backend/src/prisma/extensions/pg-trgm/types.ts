import { Prisma } from '@prisma/client/extension';

export const operations = [
  'similarity',
  'word_similarity',
  'strict_word_similarity',
] as const;
export type Operation = (typeof operations)[number];

export const comparators = ['gt', 'gte', 'eq', 'lte', 'lt'] as const;
export type Comparator = (typeof comparators)[number];

export const orders = ['asc', 'desc'] as const;
export type Order = (typeof orders)[number];

export type FieldQuery = {
  [operation in Operation]?: {
    text: string;
    threshold?: {
      [key in Comparator]?: number;
    };
    order?: Order;
    select?: boolean;
  };
};

export type SimilarityQuery<T> = {
  [field in Prisma.Args<T, 'findFirst'>['distinct']]?: FieldQuery;
};

export type SimilarityArgs<T> = {
  whereSimilarity?: SimilarityQuery<T>;
  whereRaw?: string[];
  take?: number;
  skip?: number;
  select?: string[];
  __meta?: { tableName?: string; schema?: string };
};

export type SimilarityResult<T, A> = Array<
  Prisma.Result<T, A, 'findFirst'> & { [key: `${string}_score`]: number }
>;
