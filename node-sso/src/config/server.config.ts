
import Servers, { LogPath, Listen_port } from './server.config-dev';


/**
 * 获取token by DUID
 */
export const SSO_JAVA_SERVER_GetDingToken = Servers.SSO_JAVA_SERVER_GetDingToken;

/**
 * 获取旧版的user
 */
export const DOTNET_APPCENTER_SERVER_GetOldUser = Servers.DOTNET_APPCENTER_SERVER_GetOldUser;

export const DING_SERVER_AUTHCODE = Servers.DING_SERVER_AUTHCODE;

export const LOG_PATH = LogPath;

export const LISTEN_PORT = Listen_port;