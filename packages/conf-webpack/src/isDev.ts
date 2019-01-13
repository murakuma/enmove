
import minimist from "minimist";

/**
 * Determine if the webpack mode is `development`.
 * @param args The command arguments.
 */
export function isDev( args: string[] = process.argv ) {
    return minimist( args ).mode === "development";
}
