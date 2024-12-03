export function getSimilarLip(colorCode: string) {
  const request = {
    colorCode: colorCode,
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/similarLip`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      accessId: process.env.NEXT_PUBLIC_API_ACCESS_ID ?? '',
      accessKey: process.env.NEXT_PUBLIC_API_ACCESS_KEY ?? '',
    },
    method: 'POST',
    body: JSON.stringify(request),
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
