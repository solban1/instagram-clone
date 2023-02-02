docker network create instaclone
docker run -d -p 5432:5432 -e POSTGRES_DB=postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres --name instaclone-db --net instaclone postgres
docker build -t instaclone:test .
docker run -it -p 8000:8000 -p 3000:3000 -v "%CD%":/code --net instaclone --name instaclone-01 instaclone:test sh