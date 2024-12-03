import { Meta, StoryObj } from '@storybook/react'
import { NotFoundView } from './notFound'

const meta: Meta<typeof NotFoundView> = {
  title: 'Components/NotFoundView',
  component: NotFoundView,
}

export default meta

export const Default: StoryObj<typeof NotFoundView> = {}
