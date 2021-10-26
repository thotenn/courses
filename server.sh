#!/bin/bash
echo -e "\n---- Estableciendo directorios ----"
BASE_DIR="/home/courses"
DIR="${BASE_DIR}/courses"
echo -e "\n---- Deteniendo Gunicorn ----"
sudo service gunicorn stop
echo -e "\n---- Deteniendo el servidor nginx ----"
sudo service nginx stop
echo -e "\n---- Commiteando los repositorios (git add , git commit ...) de los repositorios ----"
git -C ${DIR}/ add .
git -C ${DIR}/ commit -am.
echo -e "\n---- Actualizando los repositorios (git pull) de los repositorios ----"
git -C ${DIR}/ pull
echo -e "\n---- Instalando paquetes nuevos para el FrontEnd ----"
npm install --prefix ${DIR}/public/
echo -e "\n---- Construyendo archivos de produccion del FrontEnd ----"
npm run build --prefix ${DIR}/public/
echo -e "\n---- Recolectando archivos estaticos ----"
${DIR}/venv/bin/python3 ${DIR}/manage.py collectstatic --noinput
echo -e "\n---- Reestableciendo Gunicorn ----"
sudo service gunicorn start
echo -e "\n---- Reestableciendo el servidor nginx ----"
sudo service nginx start
echo -e "\n---- FIN ----"