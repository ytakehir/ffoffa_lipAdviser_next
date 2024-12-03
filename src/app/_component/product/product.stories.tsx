import { Meta, StoryObj } from '@storybook/react'
import { ProductView } from './product'

const meta: Meta<typeof ProductView> = {
  title: 'Components/ProductView',
  component: ProductView,
}

export default meta

export const Default: StoryObj<typeof ProductView> = {
  args: {},
}
