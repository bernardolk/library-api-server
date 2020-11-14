module.exports = {
   PORT: process.env.PORT || 4000,
   database: {
      USERNAME: "postgres",
      PASSWORD: "admin",
      DATABASE: "library-db",
      HOST: "127.0.0.1",
      PORT: 5432,
      DIALECT: "postgres"
   }  
}