FROM python:3
ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y postgresql-client
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
COPY wait-for-postgres.sh /app/wait-for-postgres.sh
RUN chmod +x /app/wait-for-postgres.sh
RUN chmod +x /app/django.sh
EXPOSE 8000
ENTRYPOINT ["/app/django.sh"]