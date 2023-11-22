import React, { useState, useEffect, useRef } from 'react';
import '../css/AnnotationTool.css'

import { useParams } from 'react-router-dom';
//sahithi
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
        const imageName = img.src; // Assumes a simple filename without path
        console.log('Image name:', imageName);
        console.log("@@@@@img : ", img.src)
        setImageDimensions({image_position_x: offsetLeft, image_position_y: offsetTop, image_width: clientWidth, image_height: clientHeight })
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
            // let { offsetLeft, offsetTop, clientWidth, clientHeight } = imageDimensions
            if (currentBox) {
                setBoxes([...boxes, currentBox]);
            }
            setIsDrawing(false);
            setCurrentBox(null);
            setStartPoint(null);
        }
    };

    const saveLabels = async (filename, formated_labels) => {
        try {
          const response = await fetch('http://localhost:8000/api/save_labels/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filename: filename,
              string_array: formated_labels, // Assuming stringArray is a multiline string
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('File created successfully:', data.filepath);
          } else {
            console.error('Error creating text file:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
    }

    const saveLabelsAndImages = () => {
        let {image_position_x, image_position_y, image_width, image_height } = imageDimensions;
        var formated_labels = []
        boxes.forEach((box) => {
            let {left, top, height, width} = box
            let x1 = left, y1 = top
            let x2 = left + width, y2 = top + height
            let x1_image = x1 - image_position_x
            let y1_image = y1 - image_position_y
            let x2_image = x2 - image_position_x
            let y2_image = y2 - image_position_y
            let x_center = x1_image + (width / 2)
            let y_center = y1_image + (height / 2)
            let x_center_normalized = x_center / image_width
            let y_center_normalized = y_center / image_height
            let width_normalized = width / image_width
            let height_normalized = height / image_height
            let object_class = 9
            let formated_label_String = `${object_class} ${x_center_normalized} ${y_center_normalized} ${width_normalized} ${height_normalized}`
            formated_labels.push(formated_label_String)
        })
        setYoloBoxes(formated_labels)
        console.log(formated_labels)
        saveLabels('s', formated_labels)
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