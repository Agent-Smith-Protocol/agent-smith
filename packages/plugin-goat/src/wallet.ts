import type { WalletClientBase } from "@goat-sdk/core";
import { viem } from "@goat-sdk/wallet-viem";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { safe, SafeWalletClient } from "@goat-sdk/wallet-safe";
import { arbitrum } from "viem/chains";

// Add the chain you want to use, remember to update also
// the EVM_PROVIDER_URL to the correct one for the chain
export const chain = arbitrum;

export async function getWalletClient(
    getSetting: (key: string) => string | undefined
) {
    const privateKey = getSetting("EVM_PRIVATE_KEY");
    if (!privateKey) return null;

    const client = await safe(privateKey as `0x${string}`, arbitrum);

    return client;
}

export function getWalletProvider(walletClient: SafeWalletClient) {
    return {
        async get(): Promise<string | null> {
            try {
                const address = walletClient.getAddress();
                const balance = await walletClient.balanceOf(address);
                return `EVM Wallet Address: ${address}\nBalance: ${balance} ETH`;
            } catch (error) {
                console.error("Error in EVM wallet provider:", error);
                return null;
            }
        },
    };
}
