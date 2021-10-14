echo "Jump to app folder"
cd graph-apollo-next-ts-client/

echo "Update app from Git"
git pull

echo "Build your app"
 sudo docker-compose build

echo "run with docker"
sudo docker-compose up -d