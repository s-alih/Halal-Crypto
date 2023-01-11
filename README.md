# Halal Crypto Minting Website

Hala Crypto Community is the community dedicated to empowering an ethics-first Shariah-compliant financial crypto ecosystem

# Run and deploy the token

Follow the below steps to run and deploy the token and Haqq network

## Install dependencies

```shell
npm install
```
## Start website

```shell
npm run dev
```

## Build source code

```shell
npm run build
```

## Start in production mode

```shell
npm run start
```



## Setting NGINX


```shell
sudo nano [domainName].conf
```

## Enter the following script as the configuration of our Nginx in the editor.

```shell
server {
        listen       80;
        listen       [::]:80;
        server_name  testnextdeploy.com www.testnextdeploy.com;
location / {
                # reverse proxy for next server
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

## After that save your script and restart Nginx with the following command.


```shell
sudo nginx -t
sudo systemctl restart nginx
```
