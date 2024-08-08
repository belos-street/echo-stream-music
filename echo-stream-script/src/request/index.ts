import https from 'https'

export function requestHtml(url: string) {
  return new Promise<string>((resolve, reject) => {
    let html = ''
    https
      .get(url, function (res) {
        res.on('data', function (chunk) {
          html += chunk
        })
        res.on('end', function () {
          resolve(html)
        })
      })
      .on('error', function (e) {
        reject(e)
      })
  })
}
