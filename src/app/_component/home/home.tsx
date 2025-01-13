'use client'

import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import styles from './home.module.css'
import React from 'react'
import imageInstagram from '/public/img/Instagram_Glyph_Gradient.png'
import imageX from '/public/img/logo-black.png'
import { useHome } from './hooks'
import { steps } from './config'
import { SearchArea, Text, Step, Image, LinkLabel, ScrollView, MiniProduct, Falling } from '@ytakehir/ffoffa_components'
import AcUnitIcon from '@mui/icons-material/AcUnit'

export const Home = React.memo(() => {
  const {
    isMobile,
    colorCode,
    canvasRef,
    ranking,
    handleColorChange,
    handleCanvasMouseDown,
    optionChange,
    secondOptionChange,
    brandNameList,
    lipOptions,
    buttonClick,
    brandLogo,
    base64Code,
    uploadBase64,
  } = useHome()

  return (
    <div className={styles.content}>
      <Falling icon={<AcUnitIcon />} color={'#cbe6ff'} opacity={0.8} />
      <div className={styles.main}>
        <div className={styles.title}>
          <Text size={'h1'} text={'FFOFFA LIPADVISER'} />
        </div>
        <div className={styles.note}>
          <Text
            size={'h5'}
            text={
              <>
                似ている
                <span style={{ color: colorCode === '#ffffff' ? '#555' : colorCode, margin: '0.2rem' }}>色</span>
                のリップを
                <br />
                商品や写真から検索できるサイト
              </>
            }
          />
        </div>
      </div>
      <div className={styles.card}>
        <SearchArea
          color={colorCode}
          options={brandNameList}
          secondOptions={lipOptions}
          noOptionsMessage={'見つかりませんでした。'}
          secondNoOptionsMessage={'見つかりませんでした。ブランド選択していない場合は指定してください。'}
          buttonClick={buttonClick}
          optionChange={optionChange}
          secondOptionChange={secondOptionChange}
          canvasClick={handleCanvasMouseDown}
          colorChange={handleColorChange}
          canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
          base64Code={base64Code}
          uploadBase64={uploadBase64}
        />
      </div>
      <div className={styles.brands}>
        <div className={styles.contentTitle}>
          <Text size={'h5'} text={'BRANDS'} />
          <Text size={'h7'} text={'登録ブランド'} />
        </div>
        <div className={styles.brandLogos}>{brandLogo}</div>
      </div>
      {ranking && (
        <div className={styles.trend}>
          <div className={styles.contentTitle}>
            <Text size={'h5'} text={'TREND'} />
            <Text size={'h7'} text={'トレンド'} />
          </div>
          <ScrollView
            items={ranking?.map((product) => (
              <div className={styles.rankProduct} key={product.product.lipId}>
                <MiniProduct {...product} />
              </div>
            ))}
            slidesPerView={isMobile ? 1 : 3}
            speed={5000}
            isScroll={true}
          />
        </div>
      )}
      <div className={styles.about}>
        <div className={styles.contentTitle}>
          <Text size={'h5'} text={'ABOUT'} />
          <Text size={'h7'} text={'FFOFFA LIPADVISERについて'} />
        </div>
        <div className={styles.card}>
          <div className={styles.tutorialStep}>
            <ul>
              <li>
                FFOFFA
                LIPADVISERは、商品や写真・画像から色を取得し、そのリップに似ている色味の他のリップを検索することができます。
              </li>
              <br />
              <li>
                「韓国コスメ」や「プチプラ」などタグ情報機能もあり、廃盤・限定商品の代わりになるリップも見つけることができます。
              </li>
              <br />
              <li>FFOFFA LIPADVISERに登録されている画像データは各ブランドにご協力頂いているため、全て公認です。</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.tutorial}>
        <div className={styles.contentTitle}>
          <Text size={'h5'} text={'TUTORIAL'} />
          <Text size={'h7'} text={'使い方'} />
        </div>
        <div className={styles.card}>
          <div className={styles.tutorialStep}>
            {steps.map((step, index) => (
              <Step key={step.title} stepNumber={index + 1} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </div>
      {/* <div className={styles.blog}>
        <div className={styles.contentTitle}>
          <Text size={"h5"} text={"BLOG"} />
          <Text size={"h7"} text={"ブログ"} />
        </div>
        <div className={styles.blogCard}>
          {blogs.map((blog) => (
            <LinkLabel link={blog.link} key={blog.title}>
              <BlogCard
                date={blog.date}
                title={blog.title}
                description={blog.description}
                imageUrl={blog.imageUrl}
              />
            </LinkLabel>
          ))}
        </div>
      </div> */}
      <div className={styles.sns}>
        <Text size={'h5'} text={'公式SNS'} />
        <div className={styles.snsLinks}>
          <div className={styles.snsLink}>
            <LinkLabel link={'https://www.instagram.com/ffoffa_official/'}>
              <Image url={imageInstagram.src} alt={'Instagram'} width={'30'} height={'30'} />
            </LinkLabel>
            <Text size={'h7'} text={'Instagram'} />
          </div>
          <div className={styles.snsLink}>
            <LinkLabel link={'https://x.com/ffoffa_official/'}>
              <Image url={imageX.src} alt={'X'} width={'30'} height={'30'} />
            </LinkLabel>
            <Text size={'h7'} text={'X'} />
          </div>
        </div>
      </div>
    </div>
  )
})
