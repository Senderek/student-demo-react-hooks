/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState, useEffect, useMemo, useCallback, ChangeEvent } from "react";
import { ImageElement } from "./ImageElement";

export interface ImageListProps {
    images: ImageElement[];
}

const ImageWithPicker = (props: ImageListProps) => {
    const [selectValue, setSelectValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = selectValue + 1;
            if (nextIndex > props.images.length - 1) nextIndex = 0;
            setSelectValue(nextIndex);
        }, 5000);
        return () => clearInterval(interval);
    });

    const renderOptions = (images: ImageElement[]) =>
        images.map((x, index) => (
            <option key={x.src} value={index}>
                {x.name}
            </option>
        ));

    const renderSelectOptions = useMemo(() => <Fragment>{renderOptions(props.images)}</Fragment>, [props.images]);

    const memoizedSelectOnChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value != null) {
            const index = Number(event.target.value);
            setSelectValue(index);
            return;
        }
        setSelectValue(0);
    }, []);

    return (
        <Fragment>
            <select value={selectValue} onChange={memoizedSelectOnChange}>
                {renderSelectOptions}
            </select>
            {props.images.length - 1 >= selectValue && (
                <Fragment>
                    <img
                        key={props.images[selectValue].src}
                        src={props.images[selectValue].src}
                        title={props.images[selectValue].src}
                        alt={props.images[selectValue].src}
                    />
                    <span>{props.images[selectValue].name}</span>
                </Fragment>
            )}
        </Fragment>
    );
};

ImageWithPicker.defaultProps = {
    images: []
};

export default ImageWithPicker;
