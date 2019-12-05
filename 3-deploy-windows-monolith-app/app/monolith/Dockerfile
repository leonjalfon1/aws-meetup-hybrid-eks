FROM stefanscherer/node-windows:10.16.3-windowsservercore-2019
WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install
COPY . .
EXPOSE 3000

ENV SERVICE_IP=localhost
ENV SERVICE_PORT=30000

CMD Write-Host "Configuring services endpoints..." ; \
    (Get-Content .\services-controller.js) | foreach-object {$_ -replace 'SERVICE_IP', "$env:SERVICE_IP"} | set-content .\services-controller.js ; \ 
    (get-content .\services-controller.js) | foreach-object {$_ -replace 'SERVICE_PORT', "$env:SERVICE_PORT"} | set-content .\services-controller.js ; \
    npm start; 
