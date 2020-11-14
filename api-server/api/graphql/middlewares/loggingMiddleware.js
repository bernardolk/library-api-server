const loggingMiddleware = async (resolve, root, args, context, info) => {
   console.log(`Input arguments: ${JSON.stringify(args)}`)
   const result = await resolve(root, args, context, info);
   console.log(`Result: ${JSON.stringify(result)}`)
   return result
};


module.exports = loggingMiddleware