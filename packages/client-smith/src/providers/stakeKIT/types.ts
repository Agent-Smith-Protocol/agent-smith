export type Token = {
    network: string;
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    coinGeckoId: string;
    logoURI: string;
};

export type Addresses = {
    address: string;
    network: string;
    tokenAddress?: string;
};
