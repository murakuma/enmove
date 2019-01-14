
import { Rule } from "webpack";

export function findModuleRule( rules: ReadonlyArray<Rule>, tester: string ) {
    return rules.find(
        ( rule ): boolean => {
            if ( rule.test ) {
                return !!tester.match( rule.test as RegExp );
            }
            return false;
        }
    );
}
