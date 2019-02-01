
import { bar } from "../bar";

it( "should double the value", () => {
    expect( bar( 1 ) ).toEqual( 2 );
    expect( bar( 21 ) ).toEqual( 42 );
} );
