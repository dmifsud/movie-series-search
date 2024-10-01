// CREDIT REFERENCE: https://codesandbox.io/p/sandbox/multi-range-slider-react-js-ecwcr

import { useCallback, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import classes from './multiRangeSlider.module.css';

export interface MultiRangeSliderProps {
    min: number;
    max: number;
    onChange: (changes: { min: number; max: number }) => void;
    onChangeEnd?: (changes: { min: number; max: number }) => void;
    disabled?: boolean;
    disabledMessage?: string;
}

const MultiRangeSlider = ({
    min,
    max,
    onChange,
    onChangeEnd,
    disabled,
    disabledMessage,
}: MultiRangeSliderProps) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        setMinVal(min);
        setMaxVal(max);
    }, [min, max]);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <div
            className={classnames(classes.container, {
                [classes.disabled]: disabled,
            })}
        >
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                disabled={disabled}
                {...(disabled && disabledMessage
                    ? { title: disabledMessage }
                    : {})}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, maxVal - 1);
                    setMinVal(value);
                    event.target.value = value.toString();
                }}
                onMouseUp={() => {
                    onChangeEnd && onChangeEnd({ min: minVal, max: maxVal });
                }}
                className={classnames(
                    classes.thumb,
                    classes['thumb--zindex-3'],
                    {
                        [classes['thumb--zindex-5']]: minVal > max - 100,
                    }
                )}
            />
            <input
                type="range"
                min={min}
                max={max}
                {...(disabled && disabledMessage
                    ? { title: disabledMessage }
                    : {})}
                value={maxVal}
                ref={maxValRef}
                disabled={disabled}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal + 1);
                    setMaxVal(value);
                    event.target.value = value.toString();
                }}
                onMouseUp={() => {
                    onChangeEnd && onChangeEnd({ min: minVal, max: maxVal });
                }}
                className={classnames(
                    classes.thumb,
                    classes['thumb--zindex-4']
                )}
            />

            <div className={classes.slider}>
                <div className={classes['slider__track']} />
                <div ref={range} className={classes['slider__range']} />
                <div className={classes['slider__left-value']}>{minVal}</div>
                <div className={classes['slider__right-value']}>{maxVal}</div>
            </div>
        </div>
    );
};

export default MultiRangeSlider;
