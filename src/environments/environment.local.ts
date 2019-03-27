export const environment = {
  production: false,
  appApi: {
    baseUrl: 'http://localhost:3000'
  },
  socketConfig: {
    url: 'http://localhost:3000',
    opts: {
      transports: ['websocket']
    }
  }
};
