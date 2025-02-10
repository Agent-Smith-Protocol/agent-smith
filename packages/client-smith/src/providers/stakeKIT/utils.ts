import { STAKE_KIT_BASE_URL } from "./constants";
import { Addresses, Token } from "./types";

/**
 * Collection of API route configurations for StakeKIT interactions
 * @namespace ROUTES
 *
 * @property getAction - Retrieves an action and its associated transactions
 * @param {string} actionId - The ID of the action to retrieve
 * @param {string} stakeKitApiKey - API key for authentication
 *
 * @property getEstimatedGasForAction - Gets gas estimation for a specific action
 * @param {string} actionId - The ID of the action to estimate gas for
 * @param {string} stakeKitApiKey - API key for authentication
 *
 * @property getTransaction - Retrieves a specific transaction
 * @param {string} transactionId - The ID of the transaction to retrieve
 * @param {string} stakeKitApiKey - API key for authentication
 *
 * @property getTransactionStatusById - Gets transaction status using transaction ID
 * @param {string} transactionId - The ID of the transaction
 * @param {string} stakeKitApiKey - API key for authentication
 *
 * @property getTransactionStatusByHash - Gets transaction status using network and hash
 * @param {string} network - The network name
 * @param {string} hash - The transaction hash
 * @param {string} stakeKitApiKey - API key for authentication
 *
 * @property constructTransaction - Constructs an unsigned transaction
 * @param {string} transactionId - The ID of the transaction to construct
 * @param {string} stakeKitApiKey - API key for authentication
 *
 * @property submitTransaction - Submits signed transactions for broadcasting
 * @param {string} transactionId - The ID of the transaction
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} signedTransaction - The signed transaction data
 *
 * @property submitTransactionHash - Submits hash of an already broadcasted transaction
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} transactionId - The ID of the transaction
 * @param {string} hash - The transaction hash
 *
 * @property getTransactionVerification - Gets transaction/message verification
 * @param {string} network - The network name
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} address - The address to verify
 *
 * @property getCurrentGasParams - Retrieves current gas parameters for a network
 * @param {string} network - The network name
 * @param {string} stakeKitApiKey - API key for authentication
 *
 * @property getEnabledTokens - Gets input tokens of enabled yields
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} network - The network name
 *
 * @property getTokenPrices - Retrieves token prices for specific tokens
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {Token[]} tokenList - List of tokens to get prices for
 * @param {string} [currency="usd"] - Currency for price conversion
 *
 * @property getTokenBalances - Gets balances for specific addresses and tokens
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {Addresses[]} addresses - Array of address objects
 *
 * @property getYieldBalances - Retrieves yield balances for addresses and integration
 * @param {string} stackKitApiKey - API key for authentication
 * @param {Addresses[]} addresses - Array of address objects
 * @param {string} integrationId - The integration ID
 *
 * @property getEnabledYields - Gets enabled yields with configuration and metadata
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} network - The network name
 * @param {number} [limit=100] - Maximum number of results
 *
 * @property getEnabledNetworks - Retrieves networks of enabled yields
 * @param {string} stakeKitApiKey - API key for authentication
 *
 * @property getSingleYieldBalances - Gets balances for a specific yield
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} integrationId - The integration ID
 * @param {string} address - The address to check
 *
 * @property getYieldHistoricRewardsSummary - Retrieves historic rewards summary
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} integrationId - The integration ID
 * @param {string} address - The address to check
 *
 * @property getYieldById - Gets yield information by ID
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} yieldId - The yield ID
 *
 * @property getYieldValidators - Retrieves available validators for a yield
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} yieldId - The yield ID
 *
 * @property createEnterAction - Creates action to enter yield bearing position
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} integrationId - The integration ID
 * @param {string} address - The address entering position
 * @param {string} amount - Amount to enter with
 * @param {Token} [inputToken] - Optional input token
 *
 * @property createExitAction - Creates action to exit yield bearing position
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} integrationId - The integration ID
 * @param {string} amount - Amount to exit
 * @param {string} address - The address exiting position
 * @param {Token} [inputToken] - Optional input token
 *
 * @property estimateGasForEnterAction - Estimates gas for entering position
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} integrationId - The integration ID
 * @param {string} address - The address entering position
 * @param {string} amount - Amount to enter with
 * @param {Token} [inputToken] - Optional input token
 *
 * @property estimateGasForExitAction - Estimates gas for exiting position
 * @param {string} stakeKitApiKey - API key for authentication
 * @param {string} integrationId - The integration ID
 * @param {string} address - The address exiting position
 * @param {string} amount - Amount to exit
 * @param {Token} [inputToken] - Optional input token
 */
export const ROUTES = {
    getAction: (actionId: string, stakeKitApiKey: string) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/actions/${actionId}`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },
    getEstimatedGasForAction: (actionId: string, stakeKitApiKey: string) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/actions/${actionId}/gas-estimate`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },
    getTransaction: (transactionId: string, stakeKitApiKey: string) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/transactions/${transactionId}`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },

    getTransactionStatusById: (
        transactionId: string,
        stakeKitApiKey: string
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/transactions/${transactionId}/status`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },

    getTransactionStatusByHash: (
        network: string,
        hash: string,
        stakeKitApiKey: string
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/transactions/status/${network}/${hash}`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },

    constructTransaction: (transactionId: string, stakeKitApiKey: string) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/transactions/${transactionId}`,
            options: {
                method: "PATCH",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },

    submitTransaction: (
        transactionId: string,
        stakeKitApiKey: string,
        signedTransaction: string
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/transactions/${transactionId}/submit`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    signedTransaction,
                }),
            },
        };
    },

    submitTransactionHash: (
        stakeKitApiKey: string,
        transactionId: string,
        hash: string
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/transactions/${transactionId}/submit_hash`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    hash,
                }),
            },
        };
    },

    getTransactionVerification: (
        network: string,
        stakeKitApiKey: string,
        address: string
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/transactions/verification/${network}`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    addresses: { address },
                }),
            },
        };
    },

    getCurrentGasParams: (network: string, stakeKitApiKey: string) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/transactions/gas/${network}`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },

    getEnabledTokens: (stakeKitApiKey: string, network: string) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/tokens?network=${network}`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },

    getTokenPrices: (
        stakeKitApiKey: string,
        tokenList: Token[],
        currency: string = "usd"
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/tokens/prices`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tokenList,
                    currency,
                }),
            },
        };
    },

    getTokenBalances: (stakeKitApiKey: string, addresses: Addresses[]) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/tokens/balances`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    addresses: [...addresses],
                }),
            },
        };
    },

    getYieldBalances: (
        stackKitApiKey: string,
        addresses: Addresses[],
        integrationId: string
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/yields/balances`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stackKitApiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    addresses,
                    integrationId,
                }),
            },
        };
    },

    getEnabledYields: (
        stakeKitApiKey: string,
        network: string,
        limit: number = 100
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/yields/enabled?network=${network}&limit=${limit}`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },

    getEnabledNetworks: (stakeKitApiKey: string) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/yields/enabled/networks`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },

    getSingleYieldBalances: (
        stakeKitApiKey: string,
        integrationId: string,
        address: string
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/yields/${integrationId}/balances`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    addresses: { address },
                }),
            },
        };
    },

    getYieldHistoricRewardsSummary: (
        stakeKitApiKey: string,
        integrationId: string,
        address: string
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/yields/${integrationId}/rewards-summary`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    addresses: { address },
                }),
            },
        };
    },

    getYieldById: (stakeKitApiKey: string, yieldId: string) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v2/yields/${yieldId}`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },

    getYieldValidators: (stakeKitApiKey: string, yieldId: string) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v2/yields/${yieldId}/validators`,
            options: {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "content-type": "application/json",
                },
            },
        };
    },

    createEnterAction: (
        stakeKitApiKey: string,
        integrationId: string,
        address: string,
        amount: string,
        inputToken?: Token
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/actions/enter`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    addresses: { address },
                    integrationId,

                    args: {
                        amount,
                        inputToken,
                    },
                }),
            },
        };
    },

    createExitAction: (
        stakeKitApiKey: string,
        integrationId: string,
        amount: string,
        address: string,
        inputToken?: Token
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/actions/exit`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    addresses: { address },
                    integrationId,
                    args: {
                        amount,
                        inputToken,
                    },
                }),
            },
        };
    },

    estimateGasForEnterAction: (
        stakeKitApiKey: string,
        integrationId: string,
        address: string,
        amount: string,
        inputToken?: Token
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/actions/enter/estimate-gas`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    addresses: { address },
                    integrationId,
                    args: {
                        amount,
                        inputToken,
                    },
                }),
            },
        };
    },

    estimateGasForExitAction: (
        stakeKitApiKey: string,
        integrationId: string,
        address: string,
        amount: string,
        inputToken?: Token
    ) => {
        return {
            url: `${STAKE_KIT_BASE_URL}v1/actions/exit/estimate-gas`,
            options: {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "X-API-KEY": stakeKitApiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    addresses: { address },
                    integrationId,
                    args: {
                        amount,
                        inputToken,
                    },
                }),
            },
        };
    },
};
