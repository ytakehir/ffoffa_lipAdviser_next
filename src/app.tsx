'use client'

import Image from 'next/image'

export default function App() {
  const images = [
    { src: '/img/Instagram_Glyph_Gradient.png', width: 30, height: 30 },
    { src: '/img/logo-black.png', width: 30, height: 30 },
    { src: '/img/サムネイル.png', width: 1500, height: 500 },
  ]

  return (
    <div>
      {images.map((src, index) => (
        <Image key={index} src={src} alt={`画像 ${index + 1}`} />
      ))}
    </div>
  )
}
