const { UnauthorizedError, ServerError } = require('../errors')

module.exports = class HttpResponse {
  static badRequest (error) {
    return {
      statusCode: 400,
      body: {
        error: error.message
      }
    }
  };

  static serverError () {
    return {
      statusCode: 500,
      body: {
        error: new ServerError().message
      }
    }
  };

  static unauthorizedError () {
    return {
      statusCode: 401,
      body: {
        error: new UnauthorizedError().message
      }
    }
  };

  static ok (body) {
    return {
      statusCode: 200,
      body
    }
  };

  static created (body) {
    return {
      statusCode: 201,
      body
    }
  };

  static deleted (body) {
    return {
      statusCode: 204,
      body
    }
  };

  static updated (body) {
    return {
      statusCode: 200,
      body
    }
  };
}
