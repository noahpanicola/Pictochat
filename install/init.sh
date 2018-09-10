#!/bin/sh
cd ../server-2.0
npm start & > ../logs/server.log
cd ../client-2.0
npm start
