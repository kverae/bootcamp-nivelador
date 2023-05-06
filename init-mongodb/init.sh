#!/bin/bash

echo "########### Loading data to Mongo DB ###########"
mongoimport --jsonArray --db test --collection users --file /tmp/data/users.json