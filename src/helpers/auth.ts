import config from "@config/index";
import { prisma } from "@prisma/prisma";
import axios from "axios";

let cachedToken: string = null;
let tokenExpirationTime: number = null;
export const getCredentialsUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    const err = new Error();
    err.name = "user";
    err.message = "user not found";
    throw err;
  }
  return user;
};

export const getAuth0MgmntToken = async () => {
  if (cachedToken && tokenExpirationTime > Date.now()) {
    return cachedToken;
  }
  try {
    const response = await axios.post(
      `${config.app.auth0.issuerBaseUrl}/oauth/token`,
      {
        client_id: config.app.auth0.clientId,
        client_secret: config.app.auth0.secret,
        audience: config.app.auth0.apiIdentifier,
        grant_type: "client_credentials"
      }
    );
    cachedToken = response.data.access_token;
    tokenExpirationTime = Date.now() + response.data.expires_in * 1000; // Token expiry in milliseconds
    return cachedToken;
  } catch (error) {
    return error.response.data;
  }
};

export const revokeRefreshToken = async (
  refreshToken: string,
  managementApiToken: any
) => {
  try {
    await axios.post(
      `${config.app.auth0.issuerBaseUrl}/oauth/revoke`,
      {
        token: refreshToken
      },
      {
        headers: {
          Authorization: `Bearer ${managementApiToken.data.access_token}`,
          "content-type": "application/json"
        }
      }
    );
    return;
  } catch (error) {
    return error.response.data;
  }
};

export const revokeAllSessions = async (
  userId: number | string,
  managementApiToken: any
) => {
  try {
    await axios.post(
      `${config.app.auth0.issuerBaseUrl}/api/v2/users/${userId}/sessions`,
      {},
      {
        headers: {
          Authorization: `Bearer ${managementApiToken.data.access_token}`,
          "content-type": "application/json"
        }
      }
    );
    return;
  } catch (error) {
    console.error("Error revoking user sessions:", error.response.data);
  }
};

// Example usage
