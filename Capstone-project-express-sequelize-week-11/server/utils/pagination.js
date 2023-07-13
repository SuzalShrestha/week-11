// utils/pagination.js

function paginationMiddleware(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  const limit = size;
  const offset = (page - 1) * size;

  // Save the limit and offset as properties on the request object
  req.pagination = {
    limit,
    offset,
  };

  next();
}

module.exports = paginationMiddleware;
