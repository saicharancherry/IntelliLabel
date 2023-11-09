import React, { useState, useEffect, useRef } from 'react';
import '../css/AnnotationTool.css'

import { useParams } from 'react-router-dom';

const ImageViewer = () => {
    const { imageIndex } = useParams() || {};
    const initialLabels = ["car", "person", "laptop"]
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState(null);
    const [currentBox, setCurrentBox] = useState(null);
    const [labels, setLabels] = useState(initialLabels);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const [boxes, setBoxes] = useState([]);
    const [yoloBoxes, setYoloBoxes] = useState([]);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [selectedImage, setSelectedImage] = useState([]);
    const [imageDimensions, setImageDimensions] = useState([])

    const onImgLoad = ({ target: img }) => {
        const { offsetLeft, offsetTop, clientWidth, clientHeight } = img;

        // You now have the image's coordinates relative to its parent, and its size
        console.log(`Image Position - x: ${offsetLeft}, y: ${offsetTop}`);
        console.log(`Image Size - width: ${clientWidth}px, height: ${clientHeight}px`);

        // If you need the image's natural size:
        console.log(`Natural Size - width: ${img.naturalWidth}px, height: ${img.naturalHeight}px`);
        setImageDimensions({offsetLeft, offsetTop, clientWidth, clientHeight })
    };

    useEffect(() => {
        const droppedImages = JSON.parse(localStorage.getItem('droppedImages') || '[]');
        setSelectedImage(droppedImages[imageIndex])
    }, []);

    const onBoxClick = (index) => {
        setSelectedBoxIndex(index);
        setDropdownVisible(true);
        console.log("onboxclick :", index, boxes)
    };

    const onMouseDown = (e) => {
        setIsDrawing(true);
        setStartPoint({ x: e.clientX, y: e.clientY });
    };

    const onMouseMove = (e) => {
        if (isDrawing) {
            const box = {
                top: Math.min(startPoint.y, e.clientY),
                left: Math.min(startPoint.x, e.clientX),
                width: Math.abs(startPoint.x - e.clientX),
                height: Math.abs(startPoint.y - e.clientY),
                label: "label"
            };
            setCurrentBox(box);
        }
    };

    const onMouseUp = () => {
        if (isDrawing) {
            let { offsetLeft, offsetTop, clientWidth, clientHeight } = imageDimensions;

            console.log("onMouseUp ::: ", currentBox)
            if (currentBox) {
                setBoxes([...boxes, currentBox]);
                let currentYoloBox = {
                    x : Math.abs(currentBox.left - offsetLeft)/clientWidth * 100,
                    y : Math.abs(currentBox.top - offsetTop)/ clientHeight * 100,
                    width: currentBox.width/clientWidth * 100,
                    height: currentBox.height/clientHeight * 100,
                }
                console.log("offsetLeft, offsetTop, clientWidth, clientHeight ", offsetLeft, offsetTop, clientWidth, clientHeight)
                console.log("currentYoloBox : ", currentYoloBox)
                console.log("currebtBox : ", currentBox)
                setYoloBoxes([...yoloBoxes, currentYoloBox])
            }
            setIsDrawing(false);
            setCurrentBox(null);
            setStartPoint(null);
        }
    };

    const saveLabelsAndImages = () => {
        //Api to save boxes and images in the backend
        console.log("@@@@@@@yoloBoxes :", yoloBoxes)

    }

    const handleAddLabel = () => {
        setLabels([...labels, '']);
    };

    const handleChange = (index, value) => {
        const newLabels = [...labels];
        newLabels[index] = value;
        setLabels(newLabels);
    };

    return (
        <div className='annotation-editor'>
            {selectedImage && (<div className="image-viewer">
                <div onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
                    <img src={selectedImage} onLoad={onImgLoad} alt="Selected" draggable="false" />
                    {currentBox && (
                        <div
                            style={{
                                position: 'absolute',
                                border: '3px solid blue',
                                ...currentBox,
                            }}
                        ><div className="go-back">{currentBox.label}</div></div>
                    )}
                    {dropdownVisible && (
                        <div
                            style={{
                                position: 'absolute',
                                top: boxes[selectedBoxIndex].top + 'px',
                                left: boxes[selectedBoxIndex].left + 'px',
                                zIndex: 1000, // Ensuring it appears above other elements
                                backgroundColor: 'white',
                                border: '1px solid black',
                                boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
                            }}>
                            {labels.map((label, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '8px 16px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        // Clone the boxes array
                                        const updatedBoxes = [...boxes];
                                        if (updatedBoxes[selectedBoxIndex]) {
                                            updatedBoxes[selectedBoxIndex].label = label;
                                            setBoxes(updatedBoxes);
                                            setDropdownVisible(false);
                                        } else {
                                            console.error(`No bounding box found at index ${selectedBoxIndex}`, boxes);
                                        }
                                    }}

                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    )}

                    {boxes.map((box, index) => (
                        <div
                            key={index}
                            onClick={() => onBoxClick(index)}
                            style={{
                                position: 'absolute',
                                border: '3px solid blue',
                                ...box,
                            }}
                        >
                            <div className="label-display">{box && box.label || "label......"}</div>
                        </div>
                    ))}
                </div>
            </div>)}
            <div className="label-editor">
                <h2>labels</h2>
                {/* <p>You can now edit the label names...</p> */}
                {labels.map((label, index) => (
                    <input
                        key={index}
                        value={label}
                        onChange={(e) => handleChange(index, e.target.value)}
                        placeholder="Insert label"
                    />
                ))}
                <button onClick={handleAddLabel}>+</button>
                <button onClick={saveLabelsAndImages}> save </button>

                {/* <div>
                    <button onClick={handleSave}>Accept</button>
                    <button>Cancel</button>
                </div> */}
            </div>
        </div>
    );
};

export default ImageViewer;
