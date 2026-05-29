export const TEMPO_CHAIN_IDS: Set<number> = new Set([4217, 42431]);

export function isEvmCaip2(caip2: string): boolean {
  return /^eip155:\d+$/.test(caip2);
}

export function caip2ToEvmChainId(caip2: string): number {
  if (!isEvmCaip2(caip2)) {
    throw new Error(`Not an EVM CAIP2: ${caip2}`);
  }

  return Number(caip2.split(':')[1]);
}

export function evmChainIdToNumber(chainId: number | string | undefined): number | undefined {
  if (typeof chainId === 'undefined') return undefined;
  if (typeof chainId === 'number') return Number.isFinite(chainId) ? chainId : undefined;
  if (isEvmCaip2(chainId)) return caip2ToEvmChainId(chainId);

  const parsedChainId = Number(chainId);
  return Number.isFinite(parsedChainId) ? parsedChainId : undefined;
}

export function isTempoChainId(chainId: number | string | undefined): boolean {
  const evmChainId = evmChainIdToNumber(chainId);
  return evmChainId !== undefined && TEMPO_CHAIN_IDS.has(evmChainId);
}
