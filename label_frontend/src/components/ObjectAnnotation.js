import React, { useState, useEffect, useRef } from "react";
import "../css/AnnotationTool.css";
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InboxIcon from '@mui/icons-material/Inbox';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import { TypeAnimation } from 'react-type-animation';

import { useParams } from "react-router-dom";
//sahithi
const ImageViewer = () => {
  const { imageIndex } = useParams() || {};
  const initialLabels = ["car", "person", "laptop"];
  const searchLabelList = [
    'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light',
    'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
    'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard',
    'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
    'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
    'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
    'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
    'hair drier', 'toothbrush'
  ];
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentBox, setCurrentBox] = useState(null);
  const [labels, setLabels] = useState(initialLabels);
  const [searchLables, setSearchLabels] = useState(searchLabelList);
  const [newSearchLabel, setNewSearchLabel] = useState('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [boxes, setBoxes] = useState([]);
  const [yoloBoxes, setYoloBoxes] = useState([]);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedImagename, setSelectedImagename] = useState('');
  const [imageDimensions, setImageDimensions] = useState([]);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [createnewlabel, setcreatenewlabel] = useState(false);
  const [textlabelname, settextlabelname] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreateLabelClose = () => {
    setcreatenewlabel(false)
  }

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const handleCreateLabel = () => {
    // Logic to create a new label
    setcreatenewlabel(true)
    console.log('Create new label');
  };
const createnewlabelapi = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/save_labels/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: textlabelname
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('File created successfully:', data.labels);
      fetchLabels()
    } else {
      console.error('Error creating text file:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

  const handleNewCreateLabel = () => {
    // setLabels([...labels, textlabelname])
    createnewlabelapi()
    fetchLabels()
  }

  const searchLabelFlag = false;
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
    
    const fetchLabels = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_all_labels/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('File created successfully:', data.labels);
          setSearchLabels(data.labels)
        } else {
          console.error('Error creating text file:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    useEffect(() => {
      fetchLabels()
    }, [])

    const onBoxClick = (index) => {
        setSelectedBoxIndex(index);
        //setDropdownVisible(true);
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
                label: "Search label",
                label2: "Add Search Label"
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

    const saveLabelsAndImages = async () => {
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
            let object_class = box.labelid
            let formated_label_String = `${object_class} ${x_center_normalized} ${y_center_normalized} ${width_normalized} ${height_normalized}`
            formated_labels.push(formated_label_String)
        })
        setYoloBoxes(formated_labels)
        const data = {
          filename: selectedImagename,
          content: formated_labels,
        };
    
        try {
          const response = await fetch('http://localhost:8000/api/annotations/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          setNotification('File saved successfully!');
          setTimeout(() => setNotification(''), 5000); // Hide notification after 5 seconds
        } catch (error) {
          console.error('Error saving file:', error);
          setNotification('Failed to save file.');
          setTimeout(() => setNotification(''), 5000);
        }
        console.log(formated_labels)
        // saveLabels('s', formated_labels)
    };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notification, setNotification] = useState('');

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`http://localhost:8000?q=${searchTerm}`); // Replace with your actual search API endpoint
      const data = await response.json();
      setSearchResults(data.results); // Update search results state
      searchLabelList.filter((label) =>
        label.toLowerCase().includes(searchTerm.toLowerCase())
    )} catch (error) {
      console.error("Error fetching search results:", error);

    }
  };


  useEffect(() => {
    const droppedImages = JSON.parse(
      localStorage.getItem("droppedImages") || "[]"
    );
    setSelectedImage(droppedImages[imageIndex].image);
    setSelectedImagename(droppedImages[imageIndex].file_name);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear search results if search term is empty
    }
  }, [searchTerm]);



  const handleAddLabel = () => {
    setLabels([...labels, ""]);
  };

  const handleAddSearchLabel = () => {
    setSearchLabels([...searchLabelList, ""]);
  };




  const handleInputChange = (e) => {
    setNewSearchLabel(e.target.value);
  };

  const setSearchLabel = () => {
    const newLabels = [...searchLabelList, newSearchLabel];
    setSearchLabels(newLabels);
    setNewSearchLabel('');
  };

  const visibleSearchLabel = () => {
    searchLabelFlag = true;
  }

  const handleChange = (index, value) => {
    const newLabels = [...labels];
    newLabels[index] = value;
    setLabels(newLabels);
  };
  

  const handleCreateNewLabel = () => {
    const newLabel = prompt("Enter the new label:");
    if (newLabel) {
      setLabels([...labels, newLabel]);
    }
  };
  
  return (
    <div className="annotation-editor">
      {selectedImage && (
        <div className="image-viewer">
          <div
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            <img
              src={selectedImage}
              onLoad={onImgLoad}
              alt="Selected"
              draggable="false"
            />
            {currentBox && (
              <div
                style={{
                  position: "absolute",
                  border: "3px solid black",
                  ...currentBox,
                }}
              >
                <div className="go-back">{currentBox.label} </div>
              </div>
            )}
            {boxes.map((box, index) => (
              <div
                key={index}
                onClick={() => onBoxClick(index)}
                style={{
                  position: "absolute",
                  border: "3px solid black",
                  ...box,
                }}
              >
                <div className="label-display" onClick={() => {handleClickOpen(); }}>
                  {(box && box.label) || "label......"}
                </div>
              </div>      
            ))}
          </div>
          <div>
            {searchLabelFlag && (
            <input type={Text}/>) && (
            <button onClick={visibleSearchLabel}>Our Index Value</button>) }</div>
        </div>
        
      )}
      
      <div className="label-editor">
        <h2>selected labels</h2>
        {/* <p>You can now edit the label names...</p> */}
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'ThreeDLightShadow' }}>
          <nav aria-label="main mailbox folders">
            <List>
              {boxes.map((box, index) => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={box.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
         <button onClick={saveLabelsAndImages}>save annotations</button>
      {notification && <div className="notification">{notification}</div>}
        <div>
          <TypeAnimation
            sequence={[
              'Welcome to IntelliLabel!\nI\'m a Developer\nand a Designer.',
              1000 // Delay before stopping the animation
            ]}
            speed={200}
            wrapper="div"
            style={{ whiteSpace: 'pre-line', fontSize: '2em' }}
            omitDeletionAnimation={true}
            cursor={false}
          />
        </div>
          </div>
      <Dialog style={{}} open={open} onClose={handleClose} fullWidth>
          <DialogTitle style={{ backgroundColor: 'black', color: 'white', fontFamily: 'monospace'}}>Select Label</DialogTitle>
          <DialogContent>
            <Select
              value={label}
              onChange={handleLabelChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {searchLables.map((labelobj, idx) => (
              <MenuItem value={labelobj.id} onClick={() => {
                // Clone the boxes array
                const updatedBoxes = [...boxes];
                if (updatedBoxes[selectedBoxIndex]) {
                  updatedBoxes[selectedBoxIndex].label = labelobj.name;
                  updatedBoxes[selectedBoxIndex].labelid = labelobj.id;
                  setBoxes(updatedBoxes);
                  setDropdownVisible(false);
                } else {
                  console.error(
                    `No bounding box found at index ${selectedBoxIndex}`,
                    boxes
                  );
                }
              }}>{labelobj.name}</MenuItem>
                ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={handleCreateLabel}>
              <AddCircleOutlineIcon />
            </IconButton>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog style={{}} open={createnewlabel} onClose={handleCreateLabelClose} fullWidth>
          <DialogTitle style={{ backgroundColor: 'black', color: 'white', fontFamily: 'monospace'}}>Create Label</DialogTitle>
          <DialogContent>
            <TextField id="standard-basic" label="label name" variant="standard" 
              onChange={(e) => settextlabelname(e.target.value)}
            />
          </DialogContent>
            <Button onClick={handleCreateLabelClose}>Close</Button>
            <Button onClick={handleNewCreateLabel}>Create</Button>
        </Dialog>
    </div>
  );

};
export default ImageViewer;