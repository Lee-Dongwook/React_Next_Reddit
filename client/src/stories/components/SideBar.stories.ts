import type { Meta, StoryObj } from '@storybook/react';
import SideBar from "../../components/SideBar";

const meta: Meta<typeof SideBar> = {
    title: "Components/SideBar",
    component: SideBar,
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Authenticated: Story = {
    args: {
             
    }
}

export const Unauthenticated: Story = {
    args: {

    }
}

