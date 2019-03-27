export const environment = {
  production: true,
  appApi: {
    baseUrl: 'http://dev.contacts.com:3000'
  },
  socketConfig: {
    url: 'http://dev.contacts.com:3000',
    opts: {
      transports: ['websocket']
    }
  }
};
