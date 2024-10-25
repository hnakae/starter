FROM python:3.12-slim
# LABEL maintainer="Hiro Nakae <hnakae@uoregon.edu>"
# ARG APP_PORT=6000
# ENV APP_PORT=${APP_PORT}

# COPY . /app
# WORKDIR /app
# RUN pip install --no-cache-dir -r requirements.txt

# EXPOSE $APP_PORT
# ENTRYPOINT ["python", "app.py"]