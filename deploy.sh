#!/bin/bash
# Simple one-command deploy for Ballroom Fit.
# Usage:  ./deploy.sh   (or:  ./deploy.sh "your custom message")

set -e

MSG="${1:-Update workout plan}"

git add .
git commit -m "$MSG"
git push origin main

echo ""
echo "✅ Deployed to GitHub Pages. Check your site in 1-2 minutes."
