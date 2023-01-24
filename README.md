# Halal Crypto Minting Website

Hala Crypto Community is the community dedicated to empowering an ethics-first Shariah-compliant financial crypto ecosystem


Follow the below steps to run and deploy the website on server

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


## Production configeration

# Build docker file

```shell
docker-compose build
```

# Run created docker 

```shell
docker-compose up
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
        server_name  mint.haqq.community;
location / {
                # reverse proxy for next server
                proxy_pass http://localhost:3000;
        }
}
```

## Obtain an SSL Certificate 

```shell
sudo certbot --nginx -d mint.haqq.community
```

```shell
nano default
```

# Check it is working 

```shell
nginx -t 
```

## Reload the nginx.

```shell
service nginx reload
```
