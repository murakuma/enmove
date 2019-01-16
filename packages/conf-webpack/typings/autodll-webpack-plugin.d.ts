
/**
 * @see https://github.com/asfktz/autodll-webpack-plugin#options
 */
declare module "autodll-webpack-plugin" {

    import {
        Configuration,
        Plugin,
    } from "webpack";

    interface Options {
        inject?: boolean;
        filename?: string;
        entry?: { [key: string]: ReadonlyArray<string> };
        debug?: boolean;
        inherit?: string | (( config: Configuration ) => Configuration);
    }

    class AutoDllPlugin extends Plugin {
        constructor( options?: Options );
    }

    export default AutoDllPlugin;
}
