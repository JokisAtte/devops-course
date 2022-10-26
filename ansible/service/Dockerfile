FROM ubuntu:latest

USER root

RUN apt-get update && apt-get upgrade -y

RUN apt-get install curl -yq 

RUN apt-get -y install git

RUN apt-get install -y python3

RUN apt-get install -y python3-apt

RUN apt-get install -y sudo

RUN apt-get install -y net-tools

RUN apt-get install -y openssh-server

RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN useradd -m -s /bin/bash -G sudo -p $(openssl passwd -1 eee) ssluser

COPY --chown=ssluser:ssluser authorized_keys /home/ssluser/.ssh/authorized_keys

RUN chmod 0700 /home/ssluser/.ssh/authorized_keys

EXPOSE 22

ENTRYPOINT service ssh start && sleep 99999