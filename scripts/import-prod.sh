#!/bin/bash

DATE=`date "+%Y-%m-%d@%H_%M_%S"`
MONGO_URL="ds145881.mlab.com"
MONGO_PORT="45881"
REMOTE_DB_NAME="adnFutbol"
LOCAL_DB_NAME="casla_dev"
USER="adnfutboluser"
PASSWORD="Ka1438657"

echo "            "
echo "🚩➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖🚩"
echo "🛢 ➡️ 📂   Importing and storing remote dump. Command:"
echo "    " mongodump -h $MONGO_URL:$MONGO_PORT -d $REMOTE_DB_NAME -u $USER -p $PASSWORD -o "./dumps/$DATE"
mongodump -h $MONGO_URL:$MONGO_PORT -d $REMOTE_DB_NAME -u $USER -p $PASSWORD -o "./dumps/$DATE"

echo "            "
echo "🚩➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖🚩"
echo "🗑   Dropping Local database. Command:"
echo "    " mongo $LOCAL_DB_NAME --eval "printjson(db.dropDatabase())"
mongo $LOCAL_DB_NAME --eval "printjson(db.dropDatabase())"
echo "            "
echo "🚩➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖🚩"
echo "🛢 ➡️ 💻  Restoring local database from imported dump. Command: "
echo "    " mongorestore -h localhost -d $LOCAL_DB_NAME "./dumps/$DATE/$REMOTE_DB_NAME"
mongorestore -h localhost -d $LOCAL_DB_NAME "./dumps/$DATE/$REMOTE_DB_NAME"
echo "            "
echo "🏁  🏁  🏁  🎉  💥  Success!! :D  💥  🎉  🏁  🏁  🏁"
