import * as redis from 'redis';
const client = redis.createClient(process.env.REDISCLOUD_URL, {
  no_ready_check: true,
});

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

export const fetchSuspendedList = () => {
  return new Promise((resolve, reject) => {
    getAsync('suspendedList')
      .then(res => {
        if (!res) {
          resolve(0);
          return;
        }
        let ret = JSON.parse(res);
        resolve(ret);
      })
      .catch(e => reject(e));
  });
};

export const setSuspendedList = list => {
  client.set('suspendedList', JSON.stringify(list));
};

export const fetchLeaderBoard = () => {
  return new Promise((resolve, reject) => {
    getAsync('leaderboard')
      .then(res => {
        if (!res) {
          resolve(0);
          return;
        }
        resolve(JSON.parse(res));
      })
      .catch(e => reject(e));
  });
};

export const uploadLeaderBoard = board => {
  client.set('leaderboard', JSON.stringify(board));
};
