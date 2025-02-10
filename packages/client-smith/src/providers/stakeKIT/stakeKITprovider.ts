import { input } from "input";
import {
    createPublicClient,
    createTestClient,
    createWalletClient,
    formatUnits,
    http,
    publicActions,
    walletActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
    type IAgentRuntime,
    type Provider,
    type Memory,
    type State,
    type ICacheManager,
    elizaLogger,
} from "@elizaos/core";
import type {
    Address,
    WalletClient,
    PublicClient,
    Chain,
    HttpTransport,
    Account,
    PrivateKeyAccount,
    TestClient,
} from "viem";
import * as viemChains from "viem/chains";
import { ROUTES } from "./utils";
import { Addresses, Token } from "./types";

// {
//     token: {
//       name: 'Arbitrum',
//       symbol: 'ARB',
//       decimals: 18,
//       network: 'arbitrum',
//       address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
//       logoURI: 'https://assets.stakek.it/tokens/arb.svg'
//     },
//     availableYields: [
//       'arbitrum-arb-aave-v3-lending',
//       'arbitrum-arb-farb-0xbe3860fd4c3facdf8ad57aa8c1a36d6dc4390a49-4626-vault'
//     ]}
type EnabledTokensResponse = {
    token: Token;
    availableYields: string[];
};

export class StakeKitProvider {
    private stakeKitApiKey: string;
    private network: string;

    constructor(stakeKitApiKey: string, network: string) {
        this.stakeKitApiKey = stakeKitApiKey;
        this.network = network;
    }

    // * @property getEnabledTokens - Gets input tokens of enabled yields
    // * @param {string} stakeKitApiKey - API key for authentication
    // * @param {string} network - The network name
    async getEnabledTokens(): Promise<EnabledTokensResponse[]> {
        try {
            const fetchSettings = ROUTES.getEnabledTokens(
                this.stakeKitApiKey,
                this.network
            );
            const response = await fetch(
                fetchSettings.url,
                fetchSettings.options
            );
            const data = await response.json();

            return data;
        } catch (error) {
            elizaLogger.error("Error fetching StakeKIT enabled tokens", error);
        }
    }
    // * @property getTokenBalances - Gets balances for specific addresses and tokens
    // * @param {string} stakeKitApiKey - API key for authentication
    // * @param {Addresses[]} addresses - Array of address objects
    async getTokenBalances(addresses: Addresses[]) {
        try {
            const fetchSettings = ROUTES.getTokenBalances(
                this.stakeKitApiKey,
                addresses
            );
            const response = await fetch(
                fetchSettings.url,
                fetchSettings.options
            );
            const data = await response.json();

            return data;
        } catch (error) {
            elizaLogger.error("Error fetching StakeKIT token balances", error);
        }
    }

    async getYieldById(yieldId: string) {
        try {
            const fetchSettings = ROUTES.getYieldById(
                this.stakeKitApiKey,
                yieldId
            );
            const response = await fetch(
                fetchSettings.url,
                fetchSettings.options
            );
            const data = await response.json();

            return data;
        } catch (error) {
            elizaLogger.error("Error fetching StakeKIT yield by id", error);
        }
    }
}
