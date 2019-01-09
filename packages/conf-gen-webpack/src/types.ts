
import { Configuration } from "webpack";

export type Target = Extract<Configuration["target"], "web" | "electron-renderer" | undefined>;
export type Mode = Exclude<Configuration["mode"], "none">;
