import { Meta, StoryObj } from '@storybook/react'
import { ContactFormView } from './contactForm'

const meta: Meta<typeof ContactFormView> = {
  title: 'Components/ContactFormView',
  component: ContactFormView,
}

export default meta

export const Default: StoryObj<typeof ContactFormView> = {}
