#!/bin/bash

node initialization/docker-entrypoint.js

exec "$@"
