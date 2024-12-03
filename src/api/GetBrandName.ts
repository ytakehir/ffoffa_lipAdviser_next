export function getBrandName() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/brandName`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      accessId: process.env.NEXT_PUBLIC_API_ACCESS_ID ?? '',
      accessKey: process.env.NEXT_PUBLIC_API_ACCESS_KEY ?? '',
    },
    mode: 'cors',
    credentials: 'include',
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
