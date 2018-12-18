const MD5 = require('crypto-js/md5')
const Base64 = require('js-base64').Base64
const hmacSHA256 = require('crypto-js/hmac-sha256')

module.exports = function(context) {
  const request = context.request

  const username = request.getEnvironmentVariable('HMAC_username')
  const secret = request.getEnvironmentVariable('HMAC_secret')

  if (username === undefined || secret === undefined) {
    return
  }

  const method = request.getMethod()
  const xDate = new Date().toISOString()
  const contentType = request.getHeader('Content-Type')

  const url = document.createElement('a')
  url.href = request.getUrl()
  const path = url.pathname + url.search

  const md5Hash = MD5(request.getBodyText())
	const contentHash = Base64.encode(md5Hash)
  const canonicalStr = [method, contentType, md5Hash, path, xDate].join('')
  const signature = Base64.encode(hmacSHA256(canonicalStr, secret))
  const authToken = 'APIAuth-HMAC-SHA256 ' + username + ':' + signature

  console.log(`[hmac] Injecting date header X-Date: ${xDate}`)
  console.log(`[hmac] Injecting auth header Authorization: ${authToken}`)
	console.log(`[hmac] Injecting md5 header Content-MD5: ${md5Hash}`)  
	console.log(`[hmac] Injecting content hash header Content-MD5: ${contentHash}`)

  context.request.setHeader('Content-Type', contentType)
  context.request.setHeader('X-Date', xDate)
  context.request.setHeader('Authorization', authToken)

  // Debug
  context.request.setHeader('X-Debug-Path', path)
  context.request.setHeader('X-Debug-Method', method)
  context.request.setHeader('X-Debug-Canonical', canonicalStr)
}
