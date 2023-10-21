import React, { useState } from 'react';
import '../css/AnnotationTool.css'

const ImageViewer = () => {
    const initialLabels = ["car", "person", "laptop"]
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState(null);
    const [currentBox, setCurrentBox] = useState(null);
    const [labels, setLabels] = useState(initialLabels);

    const [boxes, setBoxes] = useState([]);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const [isLabeling, setIsLabeling] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });


    const handleLabelChange = (index, event) => {
        const newLabels = [...labels];
        newLabels[index] = event.target.value;
        setLabels(newLabels);
    };


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
            console.log("onMouseUp ::: ", currentBox)
            if (currentBox)
                setBoxes([...boxes, currentBox]);
            setIsDrawing(false);
            setCurrentBox(null);
            setStartPoint(null);
        }
    };

    const handleAddLabel = () => {
        setLabels([...labels, '']);
      };
    
      const handleChange = (index, value) => {
        const newLabels = [...labels];
        newLabels[index] = value;
        setLabels(newLabels);
      };
    
      const handleSave = () => {
        setLabels(labels);
      };

      
    return (
        <div className='annotation-editor'>
            <div className="image-viewer">
                <div onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
                    <img src="https://www.naturespicsonline.com/system/carousel_image/file/194/1.jpg" alt="Selected" draggable="false" />
                    {currentBox && (
                        <div
                            style={{
                                position: 'absolute',
                                border: '2px solid white',
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
                                border: '2px solid white',
                                ...box,
                            }}
                        ><div className="label-display">{box && box.label || "label......"}</div></div>
                    ))}
                </div>
            </div>
            {/* <div className="label-editor">
                <h2>Edit Labels</h2>
                {labels.map((label, index) => (
                    <input
                        key={index}
                        type="text"
                        value={label}
                        onChange={(event) => handleLabelChange(index, event)}
                    />
                ))}
            </div> */}
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
                <button> Train </button>

                {/* <div>
                    <button onClick={handleSave}>Accept</button>
                    <button>Cancel</button>
                </div> */}
            </div>
        </div>
    );
};

export default ImageViewer;
