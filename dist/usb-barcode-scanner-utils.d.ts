import { Device } from 'node-hid';
export declare function getDevices(): Device[];
export declare function getDevice(vendorId: number, productId: number): Device | undefined;
export declare function getDeviceByPath(path: string): Device | undefined;
export declare function defaultHidMap(): Object;
