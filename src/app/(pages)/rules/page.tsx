import '@ytakehir/ffoffa_components/dist/style.css'
import '../../../global.css'
import { RulesView } from 'src/app/_component/rules/rules'

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || ''

export const metadata = {
  alternates: {
    canonical: `${baseURL}/rules`,
  },
}

export default function Page() {
  return <RulesView />
}
