import type { Hex } from 'viem';

export const formatViemQuantity = (input: bigint): Hex => {
  return `0x${input.toString(16)}` as Hex;
};

export const formatViemQuantityLike = (input: bigint | number): Hex | number => {
  if (typeof input === 'bigint') return formatViemQuantity(input);
  return input;
};
