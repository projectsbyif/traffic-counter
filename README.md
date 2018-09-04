# Traffic Counter API

Simulates an hourly count of traffic on a road in Eastbridge.

## Local installation

1. Make sure you have a Postgresql instance running

2. Create a database called `traffic_counter`

3. Create `.env` in the project root and enter:
  ```
  DATABASE_URL=postgres://[username]@localhost:5432/traffic_counter;
  ```

4. Run `npm install`

5. Run `npm start` to start the API server

6. Run `node update.js` to create a new measurement

## Dokku installation

1. SSH into the Dokku server then run `dokku apps:create traffic-counter`

2. Run `dokku postgres:create traffic_counter`

3. Run `dokku postgress:link traffic_counter traffic-counter`

4. On your local machine, run `git remote add dokku dokku@dokku.projectsbyif.com:traffic-counter`

5. Run `git push dokku master`

6. When the deploy is complete, on the Dokku server `dokku letsencrypt traffic-counter`

7. Run `sudo su - dokku`

8. Run `crontab -e`

9. Paste `0 * * * * dokku --rm run traffic-counter node update.js` onto a new line

10. Exit and save with `CTRL+C` and `Y`

The API will now be available at [https://traffic-counter.projectsbyif.com](https://traffic-counter.projectsbyif.com). It will add a new random entry every hour using `cron`.
