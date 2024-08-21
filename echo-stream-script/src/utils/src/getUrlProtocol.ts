import https from 'https'
import http from 'http'

/**
 *
 * @param url
 * @returns httpProtocol
 */
export function getUrlProtocol(url: string) {
  return url.startsWith('https') ? https : http
}
