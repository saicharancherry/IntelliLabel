from ultralytics import YOLO
import os
import os
import shutil
save_dir = './runs'

def copy_model_best_to_yolov8n(original_path, new_directory, new_name):
    if not os.path.isfile(original_path):
        raise FileNotFoundError(f"The file {original_path} does not exist.")
    
    if not os.path.exists(new_directory):
        os.makedirs(new_directory)
    
    _, file_extension = os.path.splitext(original_path)
    
    new_file_path = os.path.join(new_directory, new_name + file_extension)
    
    shutil.copy(original_path, new_file_path)
    print(f"File copied to {new_file_path}")

def train_model():
    shutil.rmtree(save_dir)
    os.makedirs(save_dir)

    model = YOLO('yolov8n.pt')
    results = model.train(data='dy.yaml', epochs=1, imgsz=640, device='mps', project='./runs', resume=False)
    copy_model_best_to_yolov8n('./runs/train/weights/best.pt', './', 'yolov8n')
    print("------------------ YOLO training completed --------------------")

train_model()