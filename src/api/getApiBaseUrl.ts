export const getApiBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    // サーバーサイドの処理
    return process.env.NEXT_PUBLIC_BACKEND_URL || ''
  } else {
    // クライアントサイドの処理
    return process.env.NEXT_PUBLIC_API_URL || ''
  }
}
