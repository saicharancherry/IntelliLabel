# proj/celery.py or settings.py

from celery.schedules import crontab
from celery import Celery
import os
# from 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
# app = Celery('backend', broker_connection_retry_on_startup=True)

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.

app.conf.beat_schedule = {
    'train-every-minute': {
        'task': 'backend.tasks.train_yolo_task',
        'schedule': crontab(minute='*'),  # This will run the task every minute
    },
}

app.autodiscover_tasks()



