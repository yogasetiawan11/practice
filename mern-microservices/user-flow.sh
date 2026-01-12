#!/bin/bash

# 1. Register a User
echo "Registering user..."
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "devops_pro", "password": "securepassword123"}'

# 2. Login to get JWT
echo -e "\nLogging in..."
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "devops_pro", "password": "securepassword123"}' | jq -r '.token')

echo "Received Token: ${TOKEN:0:20}..."

# 3. Create a Product using the Token
echo -e "\nCreating a Product..."
curl -X POST http://localhost:3001/api/products \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name": "Docker Masterclass", "price": 49.99, "category": "education"}'

# 4. Check Metrics
echo -e "\nChecking Prometheus Metrics..."
curl http://localhost:3001/metrics | grep total_products_count