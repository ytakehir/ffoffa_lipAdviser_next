export function getProductId() {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || ''}/productId`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      accessId: process.env.NEXT_PUBLIC_API_ACCESS_ID ?? '',
      accessKey: process.env.NEXT_PUBLIC_API_ACCESS_KEY ?? '',
    },
    method: 'GET',
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((result) => {
      return JSON.parse(result)
    })
    .catch((error) => {
      console.error('エラー詳細：', error)
      throw new Error('エラー詳細：', error)
    })
}
