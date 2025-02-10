import { SearchMode, type Tweet } from "agent-twitter-client";
import {
    composeContext,
    generateMessageResponse,
    generateShouldRespond,
    messageCompletionFooter,
    shouldRespondFooter,
    type Content,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type State,
    stringToUuid,
    elizaLogger,
    getEmbeddingZeroVector,
    type IImageDescriptionService,
    ServiceType,
} from "@elizaos/core";
import type { ClientBase } from "./base.ts";
import { StakeKitProvider } from "./providers/stakeKIT/stakeKITprovider.ts";
import { NETWORKS } from "./providers/stakeKIT/constants.ts";
import { Addresses, Token } from "./providers/stakeKIT/types.ts";

export const twitterMessageHandlerTemplate =
    `
# Areas of Expertise
{{knowledge}}

# About {{agentName}} (@{{twitterUserName}}):
{{bio}}
{{lore}}
{{topics}}

{{providers}}

{{characterPostExamples}}

{{postDirections}}

Recent interactions between {{agentName}} and other users:
{{recentPostInteractions}}

{{recentPosts}}

# TASK: Generate a post/reply in the voice, style and perspective of {{agentName}} (@{{twitterUserName}}) while using the thread of tweets as additional context:

Current Post:
{{currentPost}}
Here is the descriptions of images in the Current post.
{{imageDescriptions}}

Thread of Tweets You Are Replying To:
{{formattedConversation}}

# INSTRUCTIONS: Generate a post in the voice, style and perspective of {{agentName}} (@{{twitterUserName}}). You MUST include an action if the current post text includes a prompt that is similar to one of the available actions mentioned here:
{{actionNames}}
{{actions}}

Here is the current post text again. Remember to include an action if the current post text includes a prompt that asks for one of the available actions mentioned above (does not need to be exact)
{{currentPost}}
Here is the descriptions of images in the Current post.
{{imageDescriptions}}
` + messageCompletionFooter;

export const twitterShouldRespondTemplate = (targetUsersStr: string) =>
    `# INSTRUCTIONS: Determine if {{agentName}} (@{{twitterUserName}}) should respond to the message and participate in the conversation. Do not comment. Just respond with "true" or "false".

Response options are RESPOND, IGNORE and STOP.

PRIORITY RULE: ALWAYS RESPOND to these users regardless of topic or message content: ${targetUsersStr}. Topic relevance should be ignored for these users.

For other users:
- {{agentName}} should RESPOND to messages directed at them
- {{agentName}} should RESPOND to conversations relevant to their background
- {{agentName}} should IGNORE irrelevant messages
- {{agentName}} should IGNORE very short messages unless directly addressed
- {{agentName}} should STOP if asked to stop
- {{agentName}} should STOP if conversation is concluded
- {{agentName}} is in a room with other users and wants to be conversational, but not annoying.

IMPORTANT:
- {{agentName}} (aka @{{twitterUserName}}) is particularly sensitive about being annoying, so if there is any doubt, it is better to IGNORE than to RESPOND.
- For users not in the priority list, {{agentName}} (@{{twitterUserName}}) should err on the side of IGNORE rather than RESPOND if in doubt.

Recent Posts:
{{recentPosts}}

Current Post:
{{currentPost}}

Thread of Tweets You Are Replying To:
{{formattedConversation}}

# INSTRUCTIONS: Respond with [RESPOND] if {{agentName}} should respond, or [IGNORE] if {{agentName}} should not respond to the last message and [STOP] if {{agentName}} should stop participating in the conversation.
` + shouldRespondFooter;

export class AnalystClient {
    client: ClientBase;
    runtime: IAgentRuntime;

    constructor(client: ClientBase, runtime: IAgentRuntime) {
        this.client = client;
        this.runtime = runtime;
    }

    async start() {
        const handleAnalyzeLoop = () => {
            this.handleAnalyze();
            setTimeout(
                handleAnalyzeLoop,
                // Defaults to 2 minutes
                60 * 1000
            );
        };
        handleAnalyzeLoop();
    }

    async handleAnalyze() {
        const enabledTokens = await this.client.stakeKit.getEnabledTokens();
        console.log("Enabled tokens", enabledTokens);
        /// filter allowed tokens
        const filteredTokens = enabledTokens.filter((token) =>
            this.client.isAllowedToken("arbitrum", token.token.address)
        );

        const addresses: Addresses[] = filteredTokens.map((item) => ({
            address: this.client.smithWallet,
            tokenAddress: item.token.address ? item.token.address : undefined,
            network: NETWORKS.arbitrum,
        }));

        console.log("addresses", addresses);

        const tokenBalances = await this.client.stakeKit.getTokenBalances(
            addresses
        );

        const yields = await Promise.all(
            tokenBalances.map(async (item, index) => {
                if (item.availableYields.length > 0) {
                    const yieldData = await Promise.all(
                        item.availableYields.map(async (yieldId, index) => {
                            const yieldData =
                                await this.client.stakeKit.getYieldById(
                                    yieldId
                                );

                            return yieldData;
                        })
                    );

                    return yieldData;
                }
            })
        );

        console.log("yields", yields);
        elizaLogger.log("Enabled tokens", enabledTokens);
    }
}
