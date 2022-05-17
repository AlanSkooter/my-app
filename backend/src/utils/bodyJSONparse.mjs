import querystring from 'querystring';

export const parseJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let rawJson = '';
    req
      .on('data', (chunk) => {
        rawJson += chunk;
      })
      .on('end', () => {
        try {
          if (rawJson) {
            const requestBody = querystring.parse(rawJson.toString());
            resolve(requestBody);
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        }
      })
      .on("error", reject);
  });

export const validateBodyCredentials = (body, res, status = 400) => {
  if (!body || !body.login || !body.password) {
    res.writeHead(status);
    return {
      error: {
        status: status,
        message: 'Login and password is required.'
      }
    }
  }
}