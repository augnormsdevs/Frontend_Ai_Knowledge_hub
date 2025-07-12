export const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expiry = payload.exp
      const now = Math.floor(Date.now() / 1000)
      return expiry < now
    } catch {
      return true // Treat invalid token as expired
    }
  }
  