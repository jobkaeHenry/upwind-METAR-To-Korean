import React from 'react';
import "../../../src/index"

import { CloudGraph } from './cloudGraph';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'indicator component/graph/cloudsGraph',
  component: CloudGraph,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    bgcolor: { control: 'color' },
    metarCloud : {control: 'json' }
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CloudGraph {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  bgcolor: "dimgray",
  metarCloud : [{quantity: 'FEW', height: 1800, type: undefined},{quantity: 'SCT', height: 3000, type: undefined},{quantity: 'BKN', height: 25000, type: undefined}]
};
