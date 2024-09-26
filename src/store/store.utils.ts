import { DevtoolsOptions } from "zustand/middleware";
console.log('mode', import.meta.env.MODE);
export const devtoolsConfig = (name: string): DevtoolsOptions => ({
    name, enabled: import.meta.env.MODE === 'development'
});