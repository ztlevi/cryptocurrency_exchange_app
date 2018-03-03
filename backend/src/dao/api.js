import * as axios from 'axios';

import { cryptoType } from '../res/cryptoConfigs';
import { cryptoRealtimeRequestUrl } from '../utils/cryptoDataUrls';

export let cachedCryptoPrice = {};

export const updateCurrencyPrice = () => {
  let toSyms = ['USD', 'EUR'];

  return new Promise((resolve, reject) => {
    axios
      .get(cryptoRealtimeRequestUrl(cryptoType, toSyms))
      .then(response => {
        if (response.status === 200) {
          console.log('Fetch cryptocurrency price succeed!!!');
          cachedCryptoPrice = response.data;
          resolve(1);
        } else {
          console.log('Fetch cryptocurrency price failed!!!');
          resolve(0);
        }
      })
      .catch(e => reject(e));
  });
};
