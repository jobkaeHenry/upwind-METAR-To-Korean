import React from 'react';

import { WindDirectionCompass } from './windDirectionCompass';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Indicator Component/compass/wind-direction-compass',
  component: WindDirectionCompass,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    degree: { control: 'number' },
    bgcolor:{control : "color"}
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <WindDirectionCompass {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  degree: 120,
  bgcolor:"dimgray"
};
