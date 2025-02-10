import { type Client, elizaLogger, type IAgentRuntime } from "@elizaos/core";
import { ClientBase } from "./base.ts";
import { validateSmithConfig, type SmithConfig } from "./environment.ts";
import { AnalystClient } from "./analyst.ts";

class SmithManager {
    client: ClientBase;
    analyst: AnalystClient;
    // risk: RiskClient;
    // securit: SecuritClient;
    // boss: BossClient;
    // accountant: AccountantClient;

    constructor(runtime: IAgentRuntime, smithConfig: SmithConfig) {
        // Pass twitterConfig to the base client
        this.client = new ClientBase(runtime, smithConfig);

        this.analyst = new AnalystClient(this.client, runtime);
        // Posting logic
        // this.post = new TwitterPostClient(this.client, runtime);
        // // Optional search logic (enabled if TWITTER_SEARCH_ENABLE is true)
        // if (twitterConfig.TWITTER_SEARCH_ENABLE) {
        //     elizaLogger.warn("Twitter/X client running in a mode that:");
        //     elizaLogger.warn("1. violates consent of random users");
        //     elizaLogger.warn("2. burns your rate limit");
        //     elizaLogger.warn("3. can get your account banned");
        //     elizaLogger.warn("use at your own risk");
        //     this.search = new TwitterSearchClient(this.client, runtime);
        // }
        // // Mentions and interactions
        // this.interaction = new TwitterInteractionClient(this.client, runtime);
        // // Optional Spaces logic (enabled if TWITTER_SPACES_ENABLE is true)
        // if (twitterConfig.TWITTER_SPACES_ENABLE) {
        //     this.space = new TwitterSpaceClient(this.client, runtime);
        // }
    }
}

export const SmithClientInterface: Client = {
    async start(runtime: IAgentRuntime) {
        const smithConfig: SmithConfig = await validateSmithConfig(runtime);

        elizaLogger.log("Smith client started");

        const manager = new SmithManager(runtime, smithConfig);

        // Initialize login/session
        await manager.client.init();

        await manager.analyst.start();

        // // Start the posting loop
        // await manager.post.start();

        // // Start the search logic if it exists
        // if (manager.search) {
        //     await manager.search.start();
        // }

        // // Start interactions (mentions, replies)
        // await manager.interaction.start();

        // // If Spaces are enabled, start the periodic check
        // if (manager.space) {
        //     manager.space.startPeriodicSpaceCheck();
        // }

        return manager;
    },

    async stop(_runtime: IAgentRuntime) {
        elizaLogger.warn("Smith client does not support stopping yet");
    },
};

export default SmithClientInterface;
