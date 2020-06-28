import React, { Fragment, useMemo, useCallback, ChangeEvent, useContext } from "react";
import { ImageElement } from "./ImageElement";

export interface ImageSelectorProps {
    context: any;
    images: ImageElement[];
}

const ImageSelector = (props: ImageSelectorProps) => {
    const [value, setValue] = useContext(props.context);
    const renderOptions = (images: ImageElement[]) =>
        images.map((x, index) => (
            <option key={x.src} value={index}>
                {x.name}
            </option>
        ));

    const renderSelectOptions = useMemo(() => <Fragment>{renderOptions(props.images)}</Fragment>, [props.images]);

    const memoizedSelectOnChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            if (event.target.value != null) {
                const index = Number(event.target.value);
                setValue((value: number) => index);
                return;
            }
            setValue(() => 0);
        },
        [setValue]
    );

    return (
        <select value={value} onChange={memoizedSelectOnChange}>
            {renderSelectOptions}
        </select>
    );
};

export default ImageSelector;
