import React, { useEffect, useRef, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const VideoWebSocket = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [receivedImage, setReceivedImage] = useState(null);
    const [error, setError] = useState(null);
    const [selectedImageDetectionNames, setSelectedImageDetectionNames] = useState([]);

    useEffect(() => {
        const rws = new ReconnectingWebSocket('ws://localhost:8000/ws/videoframes/');
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const setupWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;

                video.onloadedmetadata = () => {
                    video.play().catch(e => {
                        console.error('Error playing video stream:', e);
                        setError('Error playing video. Please check your webcam settings.');
                    });
                };

                const interval = setInterval(() => {
                    if (video.readyState >= 3) {
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const frame = canvas.toDataURL('image/jpeg');
                        rws.send(frame);
                    }
                }, 100); // Adjust interval for desired frame rate

                return () => {
                    // clearInterval(interval);
                    // stream.getTracks().forEach(track => track.stop());
                };
            } catch (e) {
                console.error('Error accessing webcam:', e);
                setError('Could not access the webcam. Please ensure it is connected and enabled.');
            }
        };

        setupWebcam();

        rws.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        rws.onmessage = (message) => {
            console.log('Received: ', JSON.parse(message.data));
            setReceivedImage(JSON.parse(message.data).img); // Assuming the server sends a base64 image
            setSelectedImageDetectionNames(JSON.parse(message.data).detection_names);
            console.log("#!##  JSON.parse(message.data).messages.detection_names ", selectedImageDetectionNames)

        };

        rws.onerror = (error) => {
            console.error('WebSocket Error: ', error);
            setError('WebSocket connection error. Please check the server.');
        };

        return () => {
            video.srcObject && video.srcObject.getTracks().forEach(track => track.stop());
            rws.close();
        };
    }, []);

    return (
        <div>
            <div style={{ backgroundColor: 'black', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ color: 'white', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }}>Video WebSocket</h2>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <video ref={videoRef} style={{ display: 'none' }}></video>
                <canvas ref={canvasRef} style={{ display: 'none' }} width="1500" height="1000"></canvas>
                {receivedImage && <img style={{ maxWidth: '100%', maxHeight: '100vh', objectFit: 'contain' }} src={receivedImage} alt="Received Frame" />}
                <div style={{ backgroundColor: 'white'}}>
                <h2>Objects Detected</h2>
                <ul>
                    {selectedImageDetectionNames && selectedImageDetectionNames.map((name, freq) => (
                        <li>
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
            </div>

        </div>
    );
};

export default VideoWebSocket;
