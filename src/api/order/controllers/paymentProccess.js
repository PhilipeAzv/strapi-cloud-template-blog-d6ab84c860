module.exports = {
    // GET /hello
    index: async ctx => {
      ctx.send('Hello World!');
      console.log('t')
    },
  };