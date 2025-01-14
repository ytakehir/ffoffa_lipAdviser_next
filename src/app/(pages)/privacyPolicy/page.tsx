import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import { PrivacyPolicyView } from 'src/app/_component/privacyPolicy/privacyPolicy'

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || ''

export const metadata = {
  alternates: {
    canonical: `${baseURL}/privacyPolicy`,
  },
}

export default function Page() {
  return <PrivacyPolicyView />
}
