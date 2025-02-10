import {
    type Content,
    type IAgentRuntime,
    type IImageDescriptionService,
    type Memory,
    type State,
    type UUID,
    getEmbeddingZeroVector,
    elizaLogger,
    stringToUuid,
    ActionTimelineType,
} from "@elizaos/core";
import {
    type QueryTweetsResponse,
    Scraper,
    SearchMode,
    type Tweet,
} from "agent-twitter-client";
import { EventEmitter } from "events";
import type { SmithConfig } from "./environment.ts";
import { NETWORKS } from "./providers/stakeKIT/constants.ts";
import { StakeKitProvider } from "./providers/stakeKIT/stakeKITprovider.ts";

class RequestQueue {
    private queue: (() => Promise<any>)[] = [];
    private processing = false;

    async add<T>(request: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    const result = await request();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
            this.processQueue();
        });
    }

    private async processQueue(): Promise<void> {
        if (this.processing || this.queue.length === 0) {
            return;
        }
        this.processing = true;

        while (this.queue.length > 0) {
            const request = this.queue.shift()!;
            try {
                await request();
            } catch (error) {
                console.error("Error processing request:", error);
                this.queue.unshift(request);
                await this.exponentialBackoff(this.queue.length);
            }
            await this.randomDelay();
        }

        this.processing = false;
    }

    private async exponentialBackoff(retryCount: number): Promise<void> {
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    private async randomDelay(): Promise<void> {
        const delay = Math.floor(Math.random() * 2000) + 1500;
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}

const USDC = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";

export class ClientBase extends EventEmitter {
    runtime: IAgentRuntime;
    smithConfig: SmithConfig;
    stakeKit: StakeKitProvider;
    smithWallet: string;

    /// mapping  chainName -> string -> boolean
    allowedTokens: Record<string, Record<string, boolean>> = {};
    requestQueue: RequestQueue = new RequestQueue();

    callback: (self: ClientBase) => any = null;

    onReady() {
        throw new Error(
            "Not implemented in base class, please call from subclass"
        );
    }

    constructor(runtime: IAgentRuntime, smithConfig: SmithConfig) {
        super();
        this.runtime = runtime;
        this.smithConfig = smithConfig;
        this.allowedTokens = {};
        this.stakeKit = new StakeKitProvider(
            smithConfig.STAKE_KIT_API_KEY,
            "arbitrum"
        );
    }

    async init() {
        this.allowedTokens["arbitrum"] = {
            [USDC.toLowerCase()]: true,
        };
        this.smithWallet = "0xd5B5F9F7987Eeb5069a7DA021029d48AFAA8e817";
        // const username = this.twitterConfig.TWITTER_USERNAME;
        // const password = this.twitterConfig.TWITTER_PASSWORD;
        // const email = this.twitterConfig.TWITTER_EMAIL;
        // let retries = this.twitterConfig.TWITTER_RETRY_LIMIT;
        // const twitter2faSecret = this.twitterConfig.TWITTER_2FA_SECRET;
    }

    isAllowedToken(chain: string, token: string): boolean {
        console.log("isAllowedToken", chain, token);
        if (token === undefined) {
            return true;
        }
        return (
            this.allowedTokens[chain] &&
            this.allowedTokens[chain][token ? token.toLowerCase() : ""]
        );
    }
}
