from ultralytics import YOLO
model = YOLO('./yolov8n.pt')
results = model.train(data='dy.yaml', epochs=100, imgsz=640, device='mps')