FROM python:3.12-slim

WORKDIR /app

ARG DATABASE_URL
ARG FRONTEND_URL
ARG FRONTEND_RC_URL
ARG FRONTEND_GREEN_URL
ARG GROQ_API_KEY

ENV DATABASE_URL=$DATABASE_URL
ENV FRONTEND_URL=$FRONTEND_URL
ENV FRONTEND_RC_URL=$FRONTEND_RC_URL
ENV FRONTEND_GREEN_URL=$FRONTEND_GREEN_URL
ENV GROQ_API_KEY=$GROQ_API_KEY


COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001", "--proxy-headers", "--forwarded-allow-ips", "*"]
