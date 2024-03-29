/// <reference types="node" />
import { Node, Link, File } from './node';
import Stats from './Stats';
import Dirent from './Dirent';
import { TSetTimeout } from './setTimeoutUnref';
import { Readable, Writable } from 'stream';
import { constants } from './constants';
import { EventEmitter } from 'events';
import { TEncoding, TEncodingExtended, TDataOut } from './encoding';
export interface IError extends Error {
    code?: string;
}
export declare type TFilePath = string | Buffer | URL;
export declare type TFileId = TFilePath | number;
export declare type TData = TDataOut | Uint8Array;
export declare type TFlags = string | number;
export declare type TMode = string | number;
export declare type TTime = number | string | Date;
export declare type TCallback<TData> = (error?: IError, data?: TData) => void;
export declare type TSymlinkType = 'file' | 'dir' | 'junction';
export declare enum FLAGS {
    r,
    'r+',
    rs,
    sr,
    'rs+',
    'sr+',
    w,
    wx,
    xw,
    'w+',
    'wx+',
    'xw+',
    a,
    ax,
    xa,
    'a+',
    'ax+',
    'xa+'
}
export declare type TFlagsCopy = typeof constants.COPYFILE_EXCL | typeof constants.COPYFILE_FICLONE | typeof constants.COPYFILE_FICLONE_FORCE;
export declare function flagsToNumber(flags: TFlags): number;
export interface IOptions {
    encoding?: TEncoding | TEncodingExtended;
}
export interface IFileOptions extends IOptions {
    mode?: TMode;
    flag?: TFlags;
}
export interface IReadFileOptions extends IOptions {
    flag?: string;
}
export interface IWriteFileOptions extends IFileOptions {
}
export interface IAppendFileOptions extends IFileOptions {
}
export interface IRealpathOptions {
    encoding?: TEncodingExtended;
}
export interface IWatchFileOptions {
    persistent?: boolean;
    interval?: number;
}
export interface IReadStreamOptions {
    flags?: TFlags;
    encoding?: TEncoding;
    fd?: number;
    mode?: TMode;
    autoClose?: boolean;
    start?: number;
    end?: number;
}
export interface IWriteStreamOptions {
    flags?: TFlags;
    defaultEncoding?: TEncoding;
    fd?: number;
    mode?: TMode;
    autoClose?: boolean;
    start?: number;
}
export interface IWatchOptions extends IOptions {
    persistent?: boolean;
    recursive?: boolean;
}
export interface IMkdirOptions {
    mode?: TMode;
    recursive?: boolean;
}
export interface IReaddirOptions extends IOptions {
    withFileTypes?: boolean;
}
export interface IStatOptions {
    bigint?: boolean;
}
export declare function pathToFilename(path: TFilePath): string;
export declare function filenameToSteps(filename: string, base?: string): string[];
export declare function pathToSteps(path: TFilePath): string[];
export declare function dataToStr(data: TData, encoding?: string): string;
export declare function dataToBuffer(data: TData, encoding?: string): Buffer;
export declare function bufferToEncoding(buffer: Buffer, encoding?: TEncodingExtended): TDataOut;
export declare function toUnixTimestamp(time: any): any;
/**
 * `Volume` represents a file system.
 */
export declare class Volume {
    static fromJSON(json: {
        [filename: string]: string;
    }, cwd?: string): Volume;
    /**
     * Global file descriptor counter. UNIX file descriptors start from 0 and go sequentially
     * up, so here, in order not to conflict with them, we choose some big number and descrease
     * the file descriptor of every new opened file.
     * @type {number}
     * @todo This should not be static, right?
     */
    static fd: number;
    root: Link;
    ino: number;
    inodes: {
        [ino: number]: Node;
    };
    releasedInos: number[];
    fds: {
        [fd: number]: File;
    };
    releasedFds: any[];
    maxFiles: number;
    openFiles: number;
    StatWatcher: new () => StatWatcher;
    ReadStream: new (...args: any[]) => IReadStream;
    WriteStream: new (...args: any[]) => IWriteStream;
    FSWatcher: new () => FSWatcher;
    props: {
        Node: new (...args: any[]) => Node;
        Link: new (...args: any[]) => Link;
        File: new (...args: any[]) => File;
    };
    private promisesApi;
    readonly promises: import("./promises").IPromisesAPI;
    constructor(props?: {});
    createLink(): Link;
    createLink(parent: Link, name: string, isDirectory?: boolean, perm?: number): Link;
    deleteLink(link: Link): boolean;
    private newInoNumber;
    private newFdNumber;
    createNode(isDirectory?: boolean, perm?: number): Node;
    private getNode;
    private deleteNode;
    genRndStr(): any;
    getLink(steps: string[]): Link;
    getLinkOrThrow(filename: string, funcName?: string): Link;
    getResolvedLink(filenameOrSteps: string | string[]): Link;
    getResolvedLinkOrThrow(filename: string, funcName?: string): Link;
    resolveSymlinks(link: Link): Link;
    private getLinkAsDirOrThrow;
    private getLinkParent;
    private getLinkParentAsDirOrThrow;
    private getFileByFd;
    private getFileByFdOrThrow;
    private getNodeByIdOrCreate;
    private wrapAsync;
    private _toJSON;
    toJSON(paths?: TFilePath | TFilePath[], json?: {}, isRelative?: boolean): {};
    fromJSON(json: {
        [filename: string]: string;
    }, cwd?: string): void;
    reset(): void;
    mountSync(mountpoint: string, json: {
        [filename: string]: string;
    }): void;
    private openLink;
    private openFile;
    private openBase;
    openSync(path: TFilePath, flags: TFlags, mode?: TMode): number;
    open(path: TFilePath, flags: TFlags, /* ... */ callback: TCallback<number>): any;
    open(path: TFilePath, flags: TFlags, mode: TMode, callback: TCallback<number>): any;
    private closeFile;
    closeSync(fd: number): void;
    close(fd: number, callback: TCallback<void>): void;
    private openFileOrGetById;
    private readBase;
    readSync(fd: number, buffer: Buffer | Uint8Array, offset: number, length: number, position: number): number;
    read(fd: number, buffer: Buffer | Uint8Array, offset: number, length: number, position: number, callback: (err?: Error, bytesRead?: number, buffer?: Buffer | Uint8Array) => void): void;
    private readFileBase;
    readFileSync(file: TFileId, options?: IReadFileOptions | string): TDataOut;
    readFile(id: TFileId, callback: TCallback<TDataOut>): any;
    readFile(id: TFileId, options: IReadFileOptions | string, callback: TCallback<TDataOut>): any;
    private writeBase;
    writeSync(fd: number, buffer: Buffer | Uint8Array, offset?: number, length?: number, position?: number): number;
    writeSync(fd: number, str: string, position?: number, encoding?: TEncoding): number;
    write(fd: number, buffer: Buffer | Uint8Array, callback: (...args: any[]) => void): any;
    write(fd: number, buffer: Buffer | Uint8Array, offset: number, callback: (...args: any[]) => void): any;
    write(fd: number, buffer: Buffer | Uint8Array, offset: number, length: number, callback: (...args: any[]) => void): any;
    write(fd: number, buffer: Buffer | Uint8Array, offset: number, length: number, position: number, callback: (...args: any[]) => void): any;
    write(fd: number, str: string, callback: (...args: any[]) => void): any;
    write(fd: number, str: string, position: number, callback: (...args: any[]) => void): any;
    write(fd: number, str: string, position: number, encoding: TEncoding, callback: (...args: any[]) => void): any;
    private writeFileBase;
    writeFileSync(id: TFileId, data: TData, options?: IWriteFileOptions): void;
    writeFile(id: TFileId, data: TData, callback: TCallback<void>): any;
    writeFile(id: TFileId, data: TData, options: IWriteFileOptions | string, callback: TCallback<void>): any;
    private linkBase;
    private copyFileBase;
    copyFileSync(src: TFilePath, dest: TFilePath, flags?: TFlagsCopy): void;
    copyFile(src: TFilePath, dest: TFilePath, callback: TCallback<void>): any;
    copyFile(src: TFilePath, dest: TFilePath, flags: TFlagsCopy, callback: TCallback<void>): any;
    linkSync(existingPath: TFilePath, newPath: TFilePath): void;
    link(existingPath: TFilePath, newPath: TFilePath, callback: TCallback<void>): void;
    private unlinkBase;
    unlinkSync(path: TFilePath): void;
    unlink(path: TFilePath, callback: TCallback<void>): void;
    private symlinkBase;
    symlinkSync(target: TFilePath, path: TFilePath, type?: TSymlinkType): void;
    symlink(target: TFilePath, path: TFilePath, callback: TCallback<void>): any;
    symlink(target: TFilePath, path: TFilePath, type: TSymlinkType, callback: TCallback<void>): any;
    private realpathBase;
    realpathSync(path: TFilePath, options?: IRealpathOptions | string): TDataOut;
    realpath(path: TFilePath, callback: TCallback<TDataOut>): any;
    realpath(path: TFilePath, options: IRealpathOptions | string, callback: TCallback<TDataOut>): any;
    private lstatBase;
    lstatSync(path: TFilePath): Stats<number>;
    lstatSync(path: TFilePath, options: {
        bigint: false;
    }): Stats<number>;
    lstatSync(path: TFilePath, options: {
        bigint: true;
    }): Stats<bigint>;
    lstat(path: TFilePath, callback: TCallback<Stats>): any;
    lstat(path: TFilePath, options: IStatOptions, callback: TCallback<Stats>): any;
    private statBase;
    statSync(path: TFilePath): Stats<number>;
    statSync(path: TFilePath, options: {
        bigint: false;
    }): Stats<number>;
    statSync(path: TFilePath, options: {
        bigint: true;
    }): Stats<bigint>;
    stat(path: TFilePath, callback: TCallback<Stats>): any;
    stat(path: TFilePath, options: IStatOptions, callback: TCallback<Stats>): any;
    private fstatBase;
    fstatSync(fd: number): Stats<number>;
    fstatSync(fd: number, options: {
        bigint: false;
    }): Stats<number>;
    fstatSync(fd: number, options: {
        bigint: true;
    }): Stats<bigint>;
    fstat(fd: number, callback: TCallback<Stats>): any;
    fstat(fd: number, options: IStatOptions, callback: TCallback<Stats>): any;
    private renameBase;
    renameSync(oldPath: TFilePath, newPath: TFilePath): void;
    rename(oldPath: TFilePath, newPath: TFilePath, callback: TCallback<void>): void;
    private existsBase;
    existsSync(path: TFilePath): boolean;
    exists(path: TFilePath, callback: (exists: boolean) => void): void;
    private accessBase;
    accessSync(path: TFilePath, mode?: number): void;
    access(path: TFilePath, callback: TCallback<void>): any;
    access(path: TFilePath, mode: number, callback: TCallback<void>): any;
    appendFileSync(id: TFileId, data: TData, options?: IAppendFileOptions | string): void;
    appendFile(id: TFileId, data: TData, callback: TCallback<void>): any;
    appendFile(id: TFileId, data: TData, options: IAppendFileOptions | string, callback: TCallback<void>): any;
    private readdirBase;
    readdirSync(path: TFilePath, options?: IReaddirOptions | string): TDataOut[] | Dirent[];
    readdir(path: TFilePath, callback: TCallback<TDataOut[] | Dirent[]>): any;
    readdir(path: TFilePath, options: IReaddirOptions | string, callback: TCallback<TDataOut[] | Dirent[]>): any;
    private readlinkBase;
    readlinkSync(path: TFilePath, options?: IOptions): TDataOut;
    readlink(path: TFilePath, callback: TCallback<TDataOut>): any;
    readlink(path: TFilePath, options: IOptions, callback: TCallback<TDataOut>): any;
    private fsyncBase;
    fsyncSync(fd: number): void;
    fsync(fd: number, callback: TCallback<void>): void;
    private fdatasyncBase;
    fdatasyncSync(fd: number): void;
    fdatasync(fd: number, callback: TCallback<void>): void;
    private ftruncateBase;
    ftruncateSync(fd: number, len?: number): void;
    ftruncate(fd: number, callback: TCallback<void>): any;
    ftruncate(fd: number, len: number, callback: TCallback<void>): any;
    private truncateBase;
    truncateSync(id: TFileId, len?: number): void;
    truncate(id: TFileId, callback: TCallback<void>): any;
    truncate(id: TFileId, len: number, callback: TCallback<void>): any;
    private futimesBase;
    futimesSync(fd: number, atime: TTime, mtime: TTime): void;
    futimes(fd: number, atime: TTime, mtime: TTime, callback: TCallback<void>): void;
    private utimesBase;
    utimesSync(path: TFilePath, atime: TTime, mtime: TTime): void;
    utimes(path: TFilePath, atime: TTime, mtime: TTime, callback: TCallback<void>): void;
    private mkdirBase;
    /**
     * Creates directory tree recursively.
     * @param filename
     * @param modeNum
     */
    private mkdirpBase;
    mkdirSync(path: TFilePath, options?: TMode | IMkdirOptions): void;
    mkdir(path: TFilePath, callback: TCallback<void>): any;
    mkdir(path: TFilePath, mode: TMode | IMkdirOptions, callback: TCallback<void>): any;
    mkdirpSync(path: TFilePath, mode?: TMode): void;
    mkdirp(path: TFilePath, callback: TCallback<void>): any;
    mkdirp(path: TFilePath, mode: TMode, callback: TCallback<void>): any;
    private mkdtempBase;
    mkdtempSync(prefix: string, options?: IOptions): TDataOut;
    mkdtemp(prefix: string, callback: TCallback<void>): any;
    mkdtemp(prefix: string, options: IOptions, callback: TCallback<void>): any;
    private rmdirBase;
    rmdirSync(path: TFilePath): void;
    rmdir(path: TFilePath, callback: TCallback<void>): void;
    private fchmodBase;
    fchmodSync(fd: number, mode: TMode): void;
    fchmod(fd: number, mode: TMode, callback: TCallback<void>): void;
    private chmodBase;
    chmodSync(path: TFilePath, mode: TMode): void;
    chmod(path: TFilePath, mode: TMode, callback: TCallback<void>): void;
    private lchmodBase;
    lchmodSync(path: TFilePath, mode: TMode): void;
    lchmod(path: TFilePath, mode: TMode, callback: TCallback<void>): void;
    private fchownBase;
    fchownSync(fd: number, uid: number, gid: number): void;
    fchown(fd: number, uid: number, gid: number, callback: TCallback<void>): void;
    private chownBase;
    chownSync(path: TFilePath, uid: number, gid: number): void;
    chown(path: TFilePath, uid: number, gid: number, callback: TCallback<void>): void;
    private lchownBase;
    lchownSync(path: TFilePath, uid: number, gid: number): void;
    lchown(path: TFilePath, uid: number, gid: number, callback: TCallback<void>): void;
    private statWatchers;
    watchFile(path: TFilePath, listener: (curr: Stats, prev: Stats) => void): StatWatcher;
    watchFile(path: TFilePath, options: IWatchFileOptions, listener: (curr: Stats, prev: Stats) => void): StatWatcher;
    unwatchFile(path: TFilePath, listener?: (curr: Stats, prev: Stats) => void): void;
    createReadStream(path: TFilePath, options?: IReadStreamOptions | string): IReadStream;
    createWriteStream(path: TFilePath, options?: IWriteStreamOptions | string): IWriteStream;
    watch(path: TFilePath, options?: IWatchOptions | string, listener?: (eventType: string, filename: string) => void): FSWatcher;
}
export declare class StatWatcher extends EventEmitter {
    vol: Volume;
    filename: string;
    interval: number;
    timeoutRef: any;
    setTimeout: TSetTimeout;
    prev: Stats;
    constructor(vol: Volume);
    private loop;
    private hasChanged;
    private onInterval;
    start(path: string, persistent?: boolean, interval?: number): void;
    stop(): void;
}
export interface IReadStream extends Readable {
    new (path: TFilePath, options: IReadStreamOptions): any;
    open(): any;
    close(callback: TCallback<void>): any;
    bytesRead: number;
    path: string;
}
export interface IWriteStream extends Writable {
    bytesWritten: number;
    path: string;
    new (path: TFilePath, options: IWriteStreamOptions): any;
    open(): any;
    close(): any;
}
export declare class FSWatcher extends EventEmitter {
    _vol: Volume;
    _filename: string;
    _steps: string[];
    _filenameEncoded: TDataOut;
    _recursive: boolean;
    _encoding: TEncoding;
    _link: Link;
    _timer: any;
    constructor(vol: Volume);
    private _getName;
    private _onNodeChange;
    private _onParentChild;
    private _emit;
    private _persist;
    start(path: TFilePath, persistent?: boolean, recursive?: boolean, encoding?: TEncoding): void;
    close(): void;
}
