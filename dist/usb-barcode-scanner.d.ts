import { HID } from 'node-hid';
import { EventEmitter } from 'events';
import { UsbScannerOptions, onDataScanned } from './usb-barcode-scanner-types';
export declare class UsbScanner extends EventEmitter implements onDataScanned {
    hid?: HID;
    hidMap: any;
    constructor(options: UsbScannerOptions, hidMap?: any);
    private retreiveDevice;
    private retreiveDeviceByPath;
    startScanning(): void;
    stopScanning(): void;
    private emitDataScanned;
}
