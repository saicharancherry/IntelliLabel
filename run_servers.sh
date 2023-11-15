#!/bin/bash
DJANGO_LOG="django_server.log"
REACT_LOG="reactjs_server.log"

# Navigate to the Django project directory and run the server
source backend/bin/activate
echo "Started virtual env"
python backend/backend/manage.py runserver > "$DJANGO_LOG" 2>&1 &
./backend/backend/backend/celery -A backend worker --loglevel=info &
./backend/backend/backend/celery -A backend beat --loglevel=info &
# Navigate to the ReactJS project directory and run the server
# cd ./label_frontend
# npm start > "$REACT_LOG" 2>&1 &
# echo "Starting ReactJS server..."

tail -f "$DJANGO_LOG" "$REACT_LOG" &

# Wait for any process to finish
wait
