import * as dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    name: process.env.APP_NAME || "app_name",
    queryToken: process.env.QUERY_TOKEN || "f76885458a89fbece7ff044c4d20568e",
    headerToken: process.env.HEADER_TOKEN || "c575fdfbf6aefaa4fa920538c7f6903c",
    env: process.env.NODE_ENV || "development",
    url: process.env.APP_URL || "http://localhost:8000",
    host: process.env.APP_HOST || "localhost",
    port: process.env.APP_PORT || 8000,
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
    originRegex:
      process.env.ORIGIN_REGEX || "https?://([a-z0-9]+[.])*domainname[.]com",
    allowedOrigins:
      process.env.ALLOWED_ORIGIN ||
      "http://localhost:3000,http://localhost:4000,http://localhost:9000,https://domainname.com",
    morganLevel: process.env.MORGAN_LEVEL || "dev"
  },
  upload: {
    maxSize: process.env.MAX_IMG_SIZE || "2"
  },
  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,

    host: process.env.MAIL_HOST || "smtp.sendgrid.net",
    port: process.env.MAIL_PORT || "465",

    token_ttl: Number(process.env.MAIL_TOKEN_TTL) || 600,
    from: process.env.MAIL_FROM || "info@app_name.com",

    debug: process.env.MAIL_DEBUG === "true" || false,
    log: process.env.MAIL_LOG === "true" || false,
    receiver: process.env.MAIL_RECEIVER || "info@app_name.com"
  },
  db: {
    dbType: process.env.DATABASE_TYPE || "mysql",
    mysql_uri:
      process.env.MYSQL_URI ||
      "mysql://root:3Birdadmin123@db:3306/ledgra",
    mongo_uri:
      process.env.MONGO_URI ||
      `mongodb://localhost/${process.env.APP_NAME || "app_name"}`,
    strictDB: Boolean(process.env.MONGO_STRICT_DB) || false
  },
  frontend: {
    url: process.env.FRONTEND_URL,
    hosts: process.env.FRONTEND_HOSTS || "localhost:3030,domainname.com"
  },
  jwt: {
    secretAccess:
      process.env.JWT_ACCESS_SECRET || "hellochangethisaccesssecretonenv",
    issuer: process.env.JWT_ISSUER || "app_name",
    token_access_ttl: process.env.JWT_ACCESS_EXPIRY || "30d"
  }
};
export default config;
