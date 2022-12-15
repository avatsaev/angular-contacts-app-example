export const environment = {
  production: true,
  appApi: {
    baseUrl: 'https://reqres.in/api'
  },
  socketConfig: {
    url: 'https://contacts-api.vatsaev.com',
    opts: {
      transports: ['websocket']
    }
  }
};
