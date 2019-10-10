
const fs = require("fs");
const path = require("path");

const chalk = require("chalk");
const _ = require("lodash");

const PACKAGES_DIR = "packages";
const packages = fs.readdirSync( PACKAGES_DIR );

const log = console.log.bind( console );

let hasProblem = false;

log( "=== find-duplicated-deps ===" );
log();

for ( const package of packages ) {
    const packageDir = path.join( PACKAGES_DIR, package );
    const nodeModulesDir = path.join( packageDir, "node_modules" );

    const hasNodeModules = fs.existsSync( nodeModulesDir );
    if ( !hasNodeModules ) {
        log( chalk`{black.bgBlackBright  SKIP } ${package}` );
        continue;
    }

    // Check to see if the package has local node_modules
    const localNodeModules = fs.readdirSync( nodeModulesDir );

    let duplicatedDeps;
    if ( localNodeModules.length > 1 ) {
        duplicatedDeps = _.without( localNodeModules, ".bin" );
    } else if ( localNodeModules.length === 1 ) {
        if ( localNodeModules[0] !== ".bin" ) {
            duplicatedDeps = localNodeModules;
        }
    }

    if ( duplicatedDeps ) {
        log( chalk`{black.bgRed  DUPE } ${package} has ${duplicatedDeps.length} duplicated dep(s)` );
        hasProblem = true;
    } else {
        log( chalk`{black.bgGreenBright   ✓   } ${package} ` );
    }
}

log();
log( `${packages.length} packages have been searched.` );
log();

process.exitCode = hasProblem ? 1 : 0;
