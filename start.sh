#!/bin/bash
git pull
npm i
pm2 delete bot
pm2 start bot.js
