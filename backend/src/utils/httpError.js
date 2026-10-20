// Error con código HTTP para lanzarlo desde controladores y servicios.
class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
module.exports = HttpError;
