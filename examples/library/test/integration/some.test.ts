
import {
    bar,
    foo,
} from "@src/index";

it( "should doubles the number then converted to an array", () => {
    expect( foo( bar( 21 ) ) ).toEqual( [42] );
} );
