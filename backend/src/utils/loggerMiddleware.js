const { logAction } = require("../services/log.service");

const loggerMiddleware = async (req, res, next) => {
  const start = Date.now();

  
  const { method, originalUrl, query, body, headers } = req;
  const sessionId = req.headers["x-session-id"] || "no_session";

  res.on("finish", async () => {
    const duration = Date.now() - start;
    const logPayload = {
      method,
      url: originalUrl,
      queryParams: query,
      requestBody: body,
      statusCode: res.statusCode,
      responseTime: duration,
    };

    await logAction({
      sessionId,
      actionType: "HTTP_REQUEST",
      payload: logPayload,
    });
  });

  next();
};

module.exports = loggerMiddleware;
