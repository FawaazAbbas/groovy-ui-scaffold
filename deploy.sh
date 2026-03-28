#!/bin/bash
# Groovy Frontend — One-command deploy
# Usage: ./deploy.sh "your commit message"

set -e

MSG="${1:-deploy: update frontend}"

echo "📦 Committing changes..."
git add .
git commit -m "$MSG" || echo "Nothing new to commit"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "🔨 Building Docker image on Google Cloud..."
gcloud builds submit --config cloudbuild.yaml . \
  --gcs-source-staging-dir gs://groovy-cloudbuild-artifacts/source \
  --gcs-log-dir gs://groovy-cloudbuild-artifacts/logs \
  --project lets-get-grooooooooovy

echo "🌍 Deploying to groovy.work..."
gcloud run deploy groovy-frontend \
  --image europe-west2-docker.pkg.dev/lets-get-grooooooooovy/groovy-docker/groovy-frontend:latest \
  --region europe-west2 \
  --project lets-get-grooooooooovy

echo "✅ Live at https://groovy.work"
