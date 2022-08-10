//將controllers/information.js裡面的函示統一使用此函示處理try...catch...
const asyncWrapper = (fn) => {
  return async (req, rex, next) => {
    try {
      await fn(req, rex, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
