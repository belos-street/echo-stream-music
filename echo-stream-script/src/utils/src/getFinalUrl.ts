import { getUrlProtocol } from './getUrlProtocol'

export async function getFinalUrl(url: string | null): Promise<string> {
  if (!url) return ''
  return new Promise((resolve, reject) => {
    const protocol = getUrlProtocol(url)
    protocol
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          const location = response.headers.location
          if (location) {
            resolve(location)
          } else {
            reject(new Error('No redirect location header'))
          }
        } else {
          resolve(url) // 如果不是重定向，则返回原始 URL
        }
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
