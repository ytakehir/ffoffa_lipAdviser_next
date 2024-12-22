import '../global.css'
import ViewLayout from './(pages)/layout'
import { NotFoundView } from './_component/notFound/notFound'

export default function Page() {
  return (
    <ViewLayout>
      <NotFoundView />
    </ViewLayout>
  )
}
