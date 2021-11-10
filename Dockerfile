FROM php:8-apache
RUN apt-get update && apt-get upgrade -y
RUN docker-php-ext-install mysqli pdo_mysql
COPY ./ /var/www/html
RUN ln -fs /usr/share/zoneinfo/America/Hermosillo /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata