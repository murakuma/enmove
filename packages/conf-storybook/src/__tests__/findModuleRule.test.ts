
import { Rule } from "webpack";

import { findModuleRule } from "../findModuleRule";

export const fixture: Rule[] = [
    { test: /\.tsx?$/ },
    { test: /\.css$/ },
    { test: /\.(sa|sc)ss$/ },
];

describe( "findModuleRule", () => {

    it( "should find a module rule", () => {
        expect( findModuleRule( fixture, "foo.ts" ) ).toBe( fixture[0] );
        expect( findModuleRule( fixture, "foo.tsx" ) ).toBe( fixture[0] );
        expect( findModuleRule( fixture, "foo.sass" ) ).toBe( fixture[2] );
        expect( findModuleRule( fixture, "foo.scss" ) ).toBe( fixture[2] );
    } );

} );
