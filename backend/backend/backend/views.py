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
from django.http import JsonResponse
from .models import Image, Labels
import os

from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

# ['person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'stop sign', 'parking meter',
#  'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 
# 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 
# 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 
# 'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon',
#  'bowl', 'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 
# 'pizza', 'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'dining table',
#  'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone', 'microwave', 
# 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
#  'hair drier', 'toothbrush']
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
        results = self.predict(image)
        annotated_image, _ = self.plot_bboxes(results, image)
        return annotated_image

@api_view(['POST'])
def upload_image(request):
    if request.FILES['image']:
        image_file = request.FILES['image']
        new_image = Image(image=image_file)
        filename = image_file.name
        label_file = filename.split('.')[0] + '.txt'
        new_image.save()
        # create label file in the directory
        directory = os.path.join(BASE_DIR, 'backend/datasets/coco128/labels/train2017')
        filepath = os.path.join(directory, label_file)

        # Create an empty text file
        open(filepath, 'w').close()
        return JsonResponse({'status': 'success', 'url': new_image.image.url})
    return JsonResponse({'status': 'error'})

@api_view(['POST'])
def detect_objects(request):
    data = JSONParser().parse(request)
    images_base64 = data.get('images', [])
    detector = ObjectDetection(capture_index=0)
    response_data = []
    for img_base64 in images_base64:
        base64_str = img_base64.split(",")[1]
        img_bytes = base64.b64decode(base64_str)
        img_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_arr, cv2.IMREAD_COLOR)
        annotated_image = detector.detect_objects_in_image(img)
        if annotated_image is None or annotated_image.size == 0:
            response_data.append(img_base64)
        else:            
            _, buffer = cv2.imencode('.jpg', annotated_image)
            response_data.append("data:image/png;base64," + base64.b64encode(buffer).decode('utf-8'))

    return JsonResponse({"annotated_images": response_data})


@api_view(['POST'])
def create_label(request):
    label = Labels(name='charan')  # Replace 'Your Label Name' with the actual label name
    label.save()
    labels = Labels.objects.all()
    for label in labels:
        print(label.name)
    # search:labels = Labels.objects.all().filter(name__icontains="name")
    

@api_view(['POST'])
def save_labels(request):
    filename = request.data.get('filename')
    string_array = request.data.get('string_array')
    print("filename string_array ", filename, string_array)

    # Validate input
    if not filename or not string_array:
        return JsonResponse({'error': 'Both filename and string_array are required.'}, status=400)

    # Specify the directory for the text files
    directory = os.path.join(BASE_DIR, 'backend/datasets/coco128/labels/train2017')
    filepath = os.path.join(directory, filename)

    # Write the array of strings to the text file
    with open(filepath, 'w') as file:
        for string in string_array:
            file.write(f"{string}\n")

    # Return a response
    return JsonResponse({'status': 'success', 'filepath': filepath})