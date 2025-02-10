import {
    parseBooleanFromText,
    type IAgentRuntime,
    ActionTimelineType,
} from "@elizaos/core";
import { z, ZodError } from "zod";

export const smithEnvSchema = z.object({
    STAKE_KIT_API_KEY: z.string().min(1, "StakeKit API key is required"),
});

export type SmithConfig = z.infer<typeof smithEnvSchema>;

function safeParseInt(
    value: string | undefined | null,
    defaultValue: number
): number {
    if (!value) return defaultValue;
    const parsed = Number.parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : Math.max(1, parsed);
}

export async function validateSmithConfig(
    runtime: IAgentRuntime
): Promise<SmithConfig> {
    try {
        const smithConfig = {
            STAKE_KIT_API_KEY:
                runtime.getSetting("STAKE_KIT_API_KEY") ||
                process.env.STAKE_KIT_API_KEY,
        };

        return smithEnvSchema.parse(smithConfig);
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Smith configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
