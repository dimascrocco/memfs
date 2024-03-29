export interface IProcess {
    getuid(): number;
    getgid(): number;
    cwd(): string;
    platform: string;
    nextTick: (callback: (...args: any[]) => void, ...args: any[]) => void;
    env: {
        MEMFS_DONT_WARN?: boolean;
    };
}
export declare function createProcess(p?: IProcess): IProcess;
declare const _default: IProcess;
export default _default;
