import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import MaterialHeader, {MaterialHeaderProps} from "../screen/application/components/MaterialHeader/MaterialHeader";

export default {
    title: 'Material/MaterialHeader',
    component: MaterialHeader,
} as Meta;

const Template: Story<MaterialHeaderProps> = (args) => <MaterialHeader {...args}/>;

export const Default = Template.bind({});
Default.args = {
    text: "Hello World",
};