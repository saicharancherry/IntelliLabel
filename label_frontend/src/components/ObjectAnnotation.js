// import React, { useState, useEffect } from 'react';
// import Annotation from 'react-image-annotation';

// function AnnotationUI() {
//   const [images, setImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [annotations, setAnnotations] = useState([]);
//   const [annotation, setAnnotation] = useState({});

//   useEffect(() => {
//     setImages(JSON.parse(localStorage.getItem("droppedImages")));
//   }, []);

//   const onChange = (annotation) => {
//     setAnnotation(annotation);
//   }

//   const onSubmit = (annotation) => {
//     setAnnotations([...annotations, annotation]);
//     setAnnotation({});
//   }

//   return (
//     <div style={{ display: 'flex' }}>
//       {/* Left Section */}
//       <div style={{ flex: '1', borderRight: '1px solid #ccc', padding: '10px' }}>
//         <h2>Stored Images</h2>
//         {images.map((base64Image, index) => (
//           <div key={index} style={{ marginBottom: '10px' }}>
//             <img
//               src={base64Image}
//               alt={`Stored Image ${index + 1}`}
//               style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
//               onClick={() => setSelectedImage(base64Image)}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Right Section */}
//       <div style={{ flex: '3', padding: '10px' }}>
//         {selectedImage ? (
//           <Annotation
//             src={selectedImage}
//             annotations={annotations}
//             type={Annotation.Rectangle}
//             value={annotation}
//             onChange={onChange}
//             onSubmit={onSubmit}
//           />
//         ) : (
//           <p>Select an image to annotate.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AnnotationUI;
