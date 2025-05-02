FROM python:3.12-slim

WORKDIR /app

ARG DATABASE_URL
ARG FRONTEND_URL
ARG FRONTEND_RC_URL
ARG FRONTEND_GREEN_URL

ENV DATABASE_URL=$DATABASE_URL
ENV FRONTEND_URL=$FRONTEND_URL
ENV FRONTEND_RC_URL=$FRONTEND_RC_URL
ENV FRONTEND_GREEN_URL=$FRONTEND_GREEN_URL

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--forwarded-allow-ips", "*"]