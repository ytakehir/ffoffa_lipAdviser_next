import { Meta, StoryObj } from '@storybook/react'
import { ErrorView } from './Error'

const meta: Meta<typeof ErrorView> = {
  title: 'Components/ErrorView',
  component: ErrorView,
}

export default meta

export const Default: StoryObj<typeof ErrorView> = {}
