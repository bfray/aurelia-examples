httpClient.configure(config => {
  config
    .withbaseUrl('api/')
    .withDefaults({
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch'
      }
    })
    .withInterceptor({
      request(request) {
        let authHeader = fakeAuthService.getAuthHeaderValue(request.url);
        request.headers.append('Authorization', authHeader);
        console.log(`Requesting ${request.method} ${request.url}`);
        return request;
      },
      response(response) {
        console.log(`Received ${response.message} ${response.url}`);
        return response;
      }
    })
})