#!/bin/bash

# Simple command-line helper test tool
watch -n1 'curl -s localhost:3000 | python -m json.tool'
