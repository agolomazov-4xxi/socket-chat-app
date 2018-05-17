const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: new Date().getDate(),
});

module.exports = {generateMessage};
