from channels.generic.websocket import AsyncWebsocketConsumer
import json
import torch
import numpy as np
import cv2
from ultralytics import YOLO
import supervision as sv
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
import torch
import numpy as np
import base64

class ObjectDetection:
    def __init__(self, capture_index):
       
        self.capture_index = capture_index
        
        self.email_sent = False
        
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'

        print("Using Device: ", self.device)
        
        self.model = self.load_model()
        
        self.CLASS_NAMES_DICT = self.model.model.names
    
        self.box_annotator = sv.BoxAnnotator(color=sv.ColorPalette.default(), thickness=3, text_thickness=3, text_scale=1.5)
    

    def load_model(self):
        model = YOLO("yolov8n.pt")  # load a pretrained YOLOv8n model
        model.fuse()
        return model


    def predict(self, frame):
       
        results = self.model(frame)
        
        return results
    

    def plot_bboxes(self, results, frame):
        class_ids = []
        labels = list(results[0].names.values())
    
        detections = sv.Detections.from_ultralytics(results[0])

        frame = self.box_annotator.annotate(scene=frame, detections=detections, labels=labels)
        
        
        return frame, class_ids
    
    def detect_objects_in_image(self, image):
        # self.model = self.load_model()
        results = self.predict(image)
        annotated_image, _ = self.plot_bboxes(results, image)
        return annotated_image


class VideoFrameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.detector = ObjectDetection(capture_index=0)


    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        img_base64 = text_data
        # Process video frame here
        # For example, you can decode the frame and apply image processing
        base64_str = img_base64.split(",")[1]
        img_bytes = base64.b64decode(base64_str)
        img_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_arr, cv2.IMREAD_COLOR)
        annotated_image = self.detector.detect_objects_in_image(img)
        _, buffer = cv2.imencode('.jpg', annotated_image)
        response = "data:image/png;base64," + base64.b64encode(buffer).decode('utf-8')
        # response = "charan : Frame processed"
        await self.send(text_data=json.dumps({'message': response}))
