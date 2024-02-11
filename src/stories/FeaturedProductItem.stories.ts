import type { Meta, StoryObj } from '@storybook/vue3';

import FeaturedProductItem from 'Components/FeaturedProducts/FeaturedProductItem.vue';

const meta = {
  title: 'Lotify/FeaturedProductItem',
  component: FeaturedProductItem,
  tags: ['autodocs'],
  argTypes: {
    donationAmount: {
      description: 'The amount of the donation.',
      control: {
        type: 'range',
        min: 0,
        max: 5000,
        step: 5
      }
    },
    donationGoal: {
      description: 'The goal of the donation.',
      control: {
        type: 'range',
        min: 0,
        max: 5000,
        step: 5
      }
    },
    ticketPrice: {
      description: 'The price of a ticket.',
      control: {
        type: 'range',
        min: 0,
        max: 10,
        step: .01
      }
    },
    emailDescription: {
      description: 'The description of the game.',
      control: {
        type: 'text',
      },
    },
    url: {
      description: 'The url of the game.',
      control: {
        type: 'text',
      },
    },
    id: {
      description: 'The unique ID of a game.',
      control: {
        type: 'text',
      },
    },
  }
} satisfies Meta<typeof FeaturedProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  args: {
    donationAmount: 1250,
    donationGoal: 2500,
    ticketPrice: 2.50,
    emailDescription: "Some fancy description",
    url: "someGameUrl",
    id: 'some-uuid',
  },
};
