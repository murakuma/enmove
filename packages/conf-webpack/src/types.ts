
import { Configuration } from "webpack";

export type Target = Extract<Configuration["target"], "web" | "electron-renderer" | undefined>;
