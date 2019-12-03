FROM node:10.4

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

ENV SUM_SERVICE_IP=localhost
ENV SUM_SERVICE_PORT=3000
ENV SUBTRACTION_SERVICE_IP=localhost
ENV SUBTRACTION_SERVICE_PORT=3000
ENV MULTIPLICATION_SERVICE_IP=localhost
ENV MULTIPLICATION_SERVICE_PORT=3000
ENV DIVISION_SERVICE_IP=localhost
ENV DIVISION_SERVICE_PORT=3000

CMD echo "Configuring services endpoints..." \
    && sed -i -e 's#SUM_SERVICE_IP#'"$SUM_SERVICE_IP"'#g' services-controller.js \
    && sed -i -e 's#SUM_SERVICE_PORT#'"$SUM_SERVICE_PORT"'#g' services-controller.js \
    && sed -i -e 's#SUBTRACTION_SERVICE_IP#'"$SUBTRACTION_SERVICE_IP"'#g' services-controller.js \
    && sed -i -e 's#SUBTRACTION_SERVICE_PORT#'"$SUBTRACTION_SERVICE_PORT"'#g' services-controller.js \
    && sed -i -e 's#MULTIPLICATION_SERVICE_IP#'"$MULTIPLICATION_SERVICE_IP"'#g' services-controller.js \
    && sed -i -e 's#MULTIPLICATION_SERVICE_PORT#'"$MULTIPLICATION_SERVICE_PORT"'#g' services-controller.js \
    && sed -i -e 's#DIVISION_SERVICE_IP#'"$DIVISION_SERVICE_IP"'#g' services-controller.js \
    && sed -i -e 's#DIVISION_SERVICE_PORT#'"$DIVISION_SERVICE_PORT"'#g' services-controller.js \
    && npm start
