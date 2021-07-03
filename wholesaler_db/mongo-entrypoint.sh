#!/usr/bin/env bash
mongo --eval "db = connect('localhost:27017/${MONGODB_DATABASE}'); db.createUser({user: '${MONGODB_USER}', \
                                                                    pwd: '${MONGODB_PASS}', \
                                                                    roles: [{ role: 'readWrite', db: '${MONGODB_DATABASE}' }]});"