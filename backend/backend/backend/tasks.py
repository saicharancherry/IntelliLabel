from celery import shared_task
# from .yolo_training import train_yolo  # assuming you have a yolo_training.py file with a train_yolo function

@shared_task
def train_yolo_task():
    print("Starting YOLO training...")
    # train_yolo()
    print("YOLO training completed.")