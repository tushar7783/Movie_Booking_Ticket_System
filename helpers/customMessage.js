const EventEmitter = require("events");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");

class CustomMessage {
  constructor(res) {
    this.response = res;
    this.events = new EventEmitter();
  }

  success(statusCode, message) {
    const { response, events } = this;
    events.once("success", () =>
      response.status(statusCode).json({ ...message })
    );
    return events.emit("success");
  }

  created(statusCode, message) {
    const { response, events } = this;
    events.once("created", () =>
      response.status(statusCode).json({ ...message })
    );
    return events.emit("created");
  }

  error(statusCode, message) {
    const { response, events } = this;
    events.once("error", () =>
      response.status(statusCode).json({ ...message })
    );
    return events.emit("error");
  }
}

const okResponse = (req, res, okMessage) => {
  return new CustomMessage(res).error(StatusCodes.OK, {
    response: {
      status: ReasonPhrases.OK,
      code: StatusCodes.OK,
      method: req.method,
      message: okMessage,
    },
  });
};

const unauthorizedResponse = (req, res, errMessage) => {
  return new CustomMessage(res).error(StatusCodes.UNAUTHORIZED, {
    response: {
      status: ReasonPhrases.UNAUTHORIZED,
      code: StatusCodes.UNAUTHORIZED,
      method: req.method,
      message: errMessage,
    },
  });
};

const badRequestResponse = (req, res, errMessage) => {
  return new CustomMessage(res).error(StatusCodes.BAD_REQUEST, {
    response: {
      status: ReasonPhrases.BAD_REQUEST,
      code: StatusCodes.BAD_REQUEST,
      method: req.method,
      message: errMessage,
    },
  });
};

const forbiddenResponse = (req, res, errMessage) => {
  return new CustomMessage(res).error(StatusCodes.FORBIDDEN, {
    response: {
      status: ReasonPhrases.FORBIDDEN,
      code: StatusCodes.FORBIDDEN,
      method: req.method,
      message: errMessage,
    },
  });
};

const notFoundResponse = (req, res, errMessage) => {
  return new CustomMessage(res).error(StatusCodes.NOT_FOUND, {
    response: {
      status: ReasonPhrases.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      method: req.method,
      message: errMessage,
    },
  });
};

const serviceUnavaliableResponse = (req, res, errMessage) => {
  return new CustomMessage(res).error(StatusCodes.SERVICE_UNAVAILABLE, {
    response: {
      status: ReasonPhrases.SERVICE_UNAVAILABLE,
      code: StatusCodes.SERVICE_UNAVAILABLE,
      method: req.method,
      message: errMessage,
    },
  });
};
const internalServerErrorResponse = (req, res, errMessage) => {
  return new CustomMessage(res).error(StatusCodes.INTERNAL_SERVER_ERROR, {
    response: {
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      method: req.method,
      message: errMessage,
    },
  });
};
const defaultErrorResponse = (req, res, error) => {
  let errorResponse = error.response;
  if (errorResponse) {
    return new CustomMessage(res).error(errorResponse.status, {
      response: {
        status: errorResponse.statusText,
        code: errorResponse.status,
        method: req.method,
        message: errorResponse.data,
      },
    });
  } else {
    badRequestResponse(req, res, "Bad Request");
  }
};

module.exports = {
  unauthorizedResponse,
  badRequestResponse,
  okResponse,
  forbiddenResponse,
  notFoundResponse,
  serviceUnavaliableResponse,
  internalServerErrorResponse,
  defaultErrorResponse,
};
