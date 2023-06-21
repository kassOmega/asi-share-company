#!/bin/bash

read -p "Press enter path to server project: " path

REACT_APP_API_URL=/ npm run build

rm -dfr $path/public/*
cp -r build/* $path/public
