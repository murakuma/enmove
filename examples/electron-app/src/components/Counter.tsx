
import React, {
    useCallback,
    useState,
} from "react";

interface Props {
    initialValue?: number;
    minValue?: number;
    maxValue?: number;
    onUpdate?: ( value: number ) => void;
}

const Counter: React.SFC<Props> = ({
    initialValue = 0,
    minValue = 0,
    maxValue = Infinity,
    onUpdate,
}) => {
    const clamp = useCallback( ( x: number ) => {
        return Math.min( Math.max( x, minValue ), maxValue );
    }, [minValue, maxValue] );

    const [value, setValue] = useState( clamp( initialValue ) );

    const addValue = useCallback( ( val: number ) => {
        const nextValue = clamp( value + val );

        setValue( nextValue );
        if ( onUpdate ) {
            onUpdate( nextValue );
        }
    }, [value, setValue, onUpdate] );

    const handleIncrement = useCallback( () => addValue(  1 ), [addValue] );
    const handleDecrement = useCallback( () => addValue( -1 ), [addValue] );

    return (
        <div>
            <p>Current value: {value}</p>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </div>
    );
};

export default Counter;
