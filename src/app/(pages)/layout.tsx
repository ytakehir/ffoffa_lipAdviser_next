'use client'

import '../../global.css'
import '@ytakehir/ffoffa_components/dist/style.css'
import { FloatButton, Footer, Header, Icon } from '@ytakehir/ffoffa_components'
import { useLayout } from './hooks'

import { Notification } from '../_component/notification/notification'

export default function ViewLayout({ children }: { children: React.ReactNode }) {
  const { isVisible, pageJump, scrollToTop } = useLayout()

  return (
    <main>
      <header>
        <Header
          type={'page'}
          link={'/'}
          menuList={[
            { link: '/contactForm', name: 'お問い合わせ' },
            // { link: 'http://www.yahoo.co.jp/', name: 'ブログ' },
          ]}
          searchLink={'/'}
          logoClick={pageJump}
        />
      </header>
      <div id="root">
        <Notification />
        {isVisible && (
          <FloatButton
            buttonType={'circle'}
            visual={'primary'}
            element={<Icon type="doubleUp" />}
            onClick={() => scrollToTop()}
          />
        )}
        {children}
      </div>
      <footer className={'footer'}>
        <Footer
          menuList={[
            {
              link: '/privacyPolicy',
              name: 'プライバシーポリシー',
            },
            { link: '/rules', name: '利用規約' },
            { link: '/contactForm', name: 'お問い合わせ' },
          ]}
        />
      </footer>
    </main>
  )
}
