
import { foo } from "@src/index";

// $ExpectType number[]
foo( 0 );

// $ExpectType string[]
foo( "hi" );

// $ExpectType boolean[][]
foo( [true] );

// $ExpectError
const a: number = foo( 42 );

// $ExpectError
const b: number[] = foo( "text" );
