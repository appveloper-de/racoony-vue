export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) return
  const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
  if (!tokenCookie) return
  const token = tokenCookie.split('=')[1]
  return token
}
