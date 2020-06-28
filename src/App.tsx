import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ImageWithPicker from "./ImageWithPicker";
import { ImageElement } from "./ImageElement";

let x: ImageElement[];
let initialImagesState: ImageElement[];
x = [
    { src: logo, title: "App-logo", alt: "logo", name: "logo picture" },
    { src: "https://picsum.photos/200/300", title: "Lorem Picsum", alt: "The Lorem Ipsum for photos", name: "random picture" }
];

function fetchData(): Promise<ImageElement[]> {
    return fetch("http://localhost:3005")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return x;
        })
        .then(data => data.data)
        .catch(() => x);
}

function App() {
    const [images, setImages] = useState(initialImagesState);

    useEffect(() => {
        fetchData().then(images => {
            setImages(images);
        });
    });

    return (
        <div className="App">
            <header className="App-header">
                <ImageWithPicker images={images} />
            </header>
        </div>
    );
}

export default App;
