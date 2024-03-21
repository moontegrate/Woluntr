#!/bin/sh
 
bash -c "python woluntr/manage.py migrate && python woluntr/manage.py runserver 0.0.0.0:8000"
