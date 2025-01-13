export function getColor(base64: string) {
  const request = {
    base64: base64,
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/getColor`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      accessId: process.env.NEXT_PUBLIC_API_ACCESS_ID ?? '',
      accessKey: process.env.NEXT_PUBLIC_API_ACCESS_KEY ?? '',
    },
    method: 'POST',
    body: JSON.stringify(request),
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
