// @types/express-openid-connect.d.ts
import { UserinfoResponse, Claims } from "express-openid-connect";

declare global {
  namespace Express {
    interface Request {
      oidc: {
        isAuthenticated: () => boolean;
        idToken: string;
        accessToken?: {
          token: string;
        };
        refreshToken?: {
          token: string;
        };
        user?: Claims | UserinfoResponse;
      };
    }
  }
}
