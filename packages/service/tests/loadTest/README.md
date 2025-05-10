1. Enter wsl 

2. Cd into this folder where docker compose is so its

    mamqek@DESKTOP-4C7I0JN:/mnt/c/Programming/vue-chat-nx/packages/service/tests/loadTest$

3. Start grafana and influxdb image by running compose file 

 docker-compose up -d

4. if need to recreate a db file then in windows in packages/service folder run 

    npm run test:load

but make sure that handleMigrations() is uncommented in loadTest/service.js. End the process after migrations ran

5. In a separate WSL window cd into packages/service folder of the project and run 

    npm run test:load

now make sure that handleMigrations() is commented out in loadTest/service.js

6. in WSL in loadTest directory run the test 

    k6 run \
    --out influxdb=http://admin:admin123@localhost:8086/k6 \
    ./test.js

    or run specific scenario 

    k6 run \
    --env SCENARIO=spikeTest \
    --out influxdb=http://admin:admin123@localhost:8086/k6 \
    ./test.js


    for http logs add --http-debug="full"

7. See metrics in the grafana 

http://localhost:3000/d/346e0293-3dc0-4072-b79e-ed9c3da2b2b7/new-dashboard?orgId=1&from=2025-05-07T22:41:51.523Z&to=2025-05-07T22:42:21.635Z&timezone=browser

username: admin, password : grafana123


now for some reason login doesnt send back cookie. fix this and make some valuable metrics for the test 