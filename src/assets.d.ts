declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}
