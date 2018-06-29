#!/bin/bash

DATE=`date "+%Y-%m-%d@%H_%M_%S"`
LOCAL_DB_NAME="casla_dev"

echo "            "
echo "🚩➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖🚩"
echo "🗑   Elimino colecciones locales. Command:"
echo "    " mongo $LOCAL_DB_NAME --eval "printjson(db.canchas.drop())"
echo "    " mongo $LOCAL_DB_NAME --eval "printjson(db.divisions.drop())"
echo "    " mongo $LOCAL_DB_NAME --eval "printjson(db.equipos.drop())"
echo "    " mongo $LOCAL_DB_NAME --eval "printjson(db.objectlabs-system.drop())"
echo "    " mongo $LOCAL_DB_NAME --eval "printjson(db.objectlabs-system.admin.collections.drop())"
echo "    " mongo $LOCAL_DB_NAME --eval "printjson(db.partidos.drop())"
echo "    " mongo $LOCAL_DB_NAME --eval "printjson(db.posicionequipos.drop())"
echo "    " mongo $LOCAL_DB_NAME --eval "printjson(db.torneos.drop())"

mongo $LOCAL_DB_NAME --eval "printjson(db.canchas.drop())"
mongo $LOCAL_DB_NAME --eval "printjson(db.divisions.drop())"
mongo $LOCAL_DB_NAME --eval "printjson(db.equipos.drop())"
mongo $LOCAL_DB_NAME --eval "printjson(db.objectlabs-system.drop())"
mongo $LOCAL_DB_NAME --eval "printjson(db.objectlabs-system.admin.collections.drop())"
mongo $LOCAL_DB_NAME --eval "printjson(db.partidos.drop())"
mongo $LOCAL_DB_NAME --eval "printjson(db.posicionequipos.drop())"
mongo $LOCAL_DB_NAME --eval "printjson(db.torneos.drop())"

echo "🏁  🏁  🏁  🎉  💥  Success!! :D  💥  🎉  🏁  🏁  🏁"
