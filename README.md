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

# Start in production mode

```shell
npm run start
```


# Production configeration

## Exposed port
3000

## Build docker file

```shell
docker-compose build
```

## Run created docker 

```shell
docker-compose up
```

## Cerbot configeration

### Install certbot
```shell
sudo apt install certbot 
```
#### enter your password for sudo 

### Install certbot ngnix plugin 
```shell
sudo apt install python3-certbot-nginx
```

### Generate certificate using certbot
```shell
sudo certbot-auto certonly --standalone -d mint.haqq.community -d www.mint.haqq.community
```

### Then go to the path to ssl and enable ssl 

```shell
cd [path to ssl file of the domain]
ssl on
```

### restart ssl

```shell
restart
```




# NGINX Setup

## Enter the following script as the configuration of our Nginx in the editor.

```shell
server {
        listen       80;
        listen       [::]:80;
        listen       443 ssl;
        server_name  mint.haqq.community;
        ssl_certificate     [path to ssl file file of domain]/fullchain.pem;
        ssl_certificate_key [path to ssl file file of domain]/privkey.pem;
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
location / {
                # reverse proxy for next server
                proxy_pass http://localhost:3000;
        }
}
```


## Obtain an SSL Certificate 


### Approve SSL certificate
```shell
sudo certbot --nginx -d mint.haqq.community
```

```shell
nano default
```

## Check it is working 

```shell
nginx -t 
```

## Reload the nginx.

```shell
service nginx reload
```
