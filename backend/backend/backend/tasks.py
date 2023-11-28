from celery import shared_task
from .train import train_model # assuming you have a yolo_training.py file with a train_yolo function

@shared_task
def train_yolo_task():
    print("Starting YOLO training...")
    train_model()
    print("YOLO training completed.")