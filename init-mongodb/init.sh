#!/bin/bash

echo "########### Loading data to Mongo DB ###########"
mongoimport --jsonArray --db my-test-db2 --collection users --file /tmp/data/users.json