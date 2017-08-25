# Para levantar la app:
1) Clonar repo
2) Instalar las dependencias con `npm install`
3) Correr proyecto con `npm run dev`

# Para importa la base de production
1) Correr `./scripts/import-prod.sh`
2) Si falla darle permisos con `chmod +x scripts/import-prod.sh` y correr de nuevo

# Para deployar a heroku
1) Agregar remote `heroku git:remote -a keroku-casla -r production`
2) Push to deploy `git push production master`

# Para ver logs de heroku
1) Correr `heroku logs -a keroku-casla -t`
