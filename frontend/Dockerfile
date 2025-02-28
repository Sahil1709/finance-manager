FROM node:18-slim

WORKDIR /app

# Install system dependencies required by Next.js
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    python3 \
    && rm -rf /var/lib/apt/lists/*

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG NEXT_PUBLIC_BACKEND_URL

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

COPY package.json package-lock.json ./

RUN npm install --force --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]