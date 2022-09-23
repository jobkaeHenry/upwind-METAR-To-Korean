import React from 'react';

import { WindSpeedCompass } from './windSpeedCompass';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Indicator Component/compass/wind-speed-compass',
  component: WindSpeedCompass,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    speed: { control: 'number' },
    gust:{control : "number"},
    bgcolor:{control : "color"}
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <WindSpeedCompass {...args} />;


export const Default = Template.bind({});
export const Gust = Template.bind({});
export const Dangerous = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  speed:11,
  bgcolor:"dimgray"
};
Gust.args = {

  speed:11,
  gust:5,
  bgcolor:"dimgray"
};
Dangerous.args = {

  speed:35,
  gust:15,
  bgcolor:"dimgray"
};