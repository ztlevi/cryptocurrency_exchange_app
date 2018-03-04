export const cryptoRootUrl = 'https://min-api.cryptocompare.com/data';
export const localHost = 'http://localhost:4000';
// export const localhostUrl = `${localHost}/get_price`;
// export const localhostTradingRequestUrl = `${localHost}/trading_request`;
// export const localhostCancelTradingUrl = `${localHost}/cancel_trading`;
export const localhostUrl =
  'https://cryptoground-backend.herokuapp.com/get_price';
export const localhostTradingRequestUrl =
  'https://cryptoground-backend.herokuapp.com/trading_request';
export const localhostCancelTradingUrl =
  'https://cryptoground-backend.herokuapp.com/cancel_trading';
/**
 * generate crypto request to fetch multiple symbols price
 * @param fromSyms: Array
 * @param toSyms: Array
 * @returns {string}
 */
export const cryptoRealtimeRequestUrl = (fromSyms: Array, toSyms: Array) => {
  return `${cryptoRootUrl}/pricemulti?fsyms=${fromSyms.join()}&tsyms=${toSyms.join()}`;
};

// generate crypto request to fetch multiple symbols price
export const cryptoBatchRequestUrl = (
  fromSym,
  toSym,
  intervalType,
  limit,
  aggregate = 1
) => {
  return `${cryptoRootUrl}/histo${intervalType}?fsym=${fromSym}&tsym=${toSym}&aggregate=${aggregate}&limit=${limit}`;
};
