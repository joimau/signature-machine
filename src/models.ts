import { ReactNode } from "react";

export type Template = {
    id: number;
    label: string;
    template: string;
};

export type Provider = React.ComponentType<any>;
