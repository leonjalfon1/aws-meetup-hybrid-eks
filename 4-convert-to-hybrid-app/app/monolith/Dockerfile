FROM stefanscherer/node-windows:10.16.3-windowsservercore-2019

WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install
COPY . .
EXPOSE 3000

ENV SERVICE_IP=localhost
ENV SERVICE_PORT=30000
ENV SUM_SERVICE_IP=localhost
ENV SUM_SERVICE_PORT=30000
ENV SUBTRACTION_SERVICE_IP=localhost
ENV SUBTRACTION_SERVICE_PORT=30000

CMD Write-Host "Configuring services endpoints..." ; \
	(Get-Content .\services-controller.js) | foreach-object {$_ -replace 'SUM_SERVICE_IP', "$env:SUM_SERVICE_IP"} | set-content .\services-controller.js ; \ 
    (Get-content .\services-controller.js) | foreach-object {$_ -replace 'SUM_SERVICE_PORT', "$env:SUM_SERVICE_PORT"} | set-content .\services-controller.js ; \ 
    (Get-content .\services-controller.js) | foreach-object {$_ -replace 'SUBTRACTION_SERVICE_IP', "$env:SUBTRACTION_SERVICE_IP"} | set-content .\services-controller.js ; \ 
    (Get-content .\services-controller.js) | foreach-object {$_ -replace 'SUBTRACTION_SERVICE_PORT', "$env:SUBTRACTION_SERVICE_PORT"} | set-content .\services-controller.js ; \ 
	(Get-Content .\services-controller.js) | foreach-object {$_ -replace 'SERVICE_IP', "$env:SERVICE_IP"} | set-content .\services-controller.js ; \ 
    (Get-content .\services-controller.js) | foreach-object {$_ -replace 'SERVICE_PORT', "$env:SERVICE_PORT"} | set-content .\services-controller.js ; \ 
    npm start; 
    


#sed -i -e 's#SUM_SERVICE_PORT#'"$SUM_SERVICE_PORT"'#g' services-controller.js ; sed -i -e 's#SUBTRACTION_SERVICE_IP#'"$SUBTRACTION_SERVICE_IP"'#g' services-controller.js ; sed -i -e 's#SUBTRACTION_SERVICE_PORT#'"$SUBTRACTION_SERVICE_PORT"'#g' services-controller.js ; npm start
