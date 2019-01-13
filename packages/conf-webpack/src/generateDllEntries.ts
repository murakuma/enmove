
import { join } from "path";

import difference from "lodash.difference";
import keys from "lodash.keys";

export interface VenderDllConfig {
    include: ReadonlyArray<string>;
    exclude: ReadonlyArray<string>;
}

interface Package {
    dependencies: { [key: string]: string };
}

export function generateDllEntries( rootDir: string, config: Partial<VenderDllConfig> = {} ) {

    // Load package.json
    const pkgPath = join( rootDir, "package.json" );
    const pkg = require( pkgPath ) as Package;

    // Configuration
    const include = config.include || [];
    const exclude = config.exclude || [];

    // Dll: vender
    const deps = keys( pkg.dependencies );
    const vendor = difference(
        [...deps, ...include],
        exclude
    );

    return { vendor };
}
