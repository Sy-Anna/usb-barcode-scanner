"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_hid_1 = require("node-hid");
var events_1 = require("events");
var usb_barcode_scanner_utils_1 = require("./usb-barcode-scanner-utils");
var UsbScanner = (function (_super) {
    __extends(UsbScanner, _super);
    function UsbScanner(options, hidMap) {
        var _this = _super.call(this) || this;
        var device;
        if (options.path) {
            device = _this.retreiveDeviceByPath(options.path);
        }
        else if (options.vendorId && options.productId) {
            device = usb_barcode_scanner_utils_1.getDevice(options.vendorId, options.productId);
        }
        if (device === undefined) {
            console.warn("Device not found, please provide a valid path or vendor/product combination.");
        }
        else {
            _this.hid = new node_hid_1.HID(device.vendorId, device.productId);
            if (hidMap) {
                _this.hidMap = hidMap;
            }
            else {
                _this.hidMap = usb_barcode_scanner_utils_1.defaultHidMap();
            }
        }
        return _this;
    }
    UsbScanner.prototype.retreiveDevice = function (vendorId, productId) {
        return usb_barcode_scanner_utils_1.getDevice(vendorId, productId);
    };
    UsbScanner.prototype.retreiveDeviceByPath = function (path) {
        return usb_barcode_scanner_utils_1.getDeviceByPath(path);
    };
    UsbScanner.prototype.startScanning = function () {
        var _this = this;
        var bcodeBuffer = [];
        var barcode = '';
        if (this.hid) {
            this.hid.on('data', function (chunk) {
                if (_this.hidMap[chunk[2]]) {
                    if (chunk[2] !== 40) {
                        bcodeBuffer.push(_this.hidMap[chunk[2]]);
                    }
                    else {
                        barcode = bcodeBuffer.join("");
                        bcodeBuffer = [];
                        _this.emitDataScanned(barcode);
                    }
                }
            });
        }
    };
    UsbScanner.prototype.stopScanning = function () {
        if (this.hid) {
            this.hid.close();
        }
    };
    UsbScanner.prototype.emitDataScanned = function (data) {
        this.emit('data', data);
    };
    return UsbScanner;
}(events_1.EventEmitter));
exports.UsbScanner = UsbScanner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNiLWJhcmNvZGUtc2Nhbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2ItYmFyY29kZS1zY2FubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2QyxpQ0FBc0M7QUFHdEMseUVBQXdGO0FBRXhGO0lBQWdDLDhCQUFZO0lBSXhDLG9CQUFZLE9BQTBCLEVBQUUsTUFBWTtRQUFwRCxZQUNJLGlCQUFPLFNBcUJWO1FBbkJHLElBQUksTUFBd0IsQ0FBQztRQUU3QixJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDZCxNQUFNLEdBQUcsS0FBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwRDthQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzlDLE1BQU0sR0FBRyxxQ0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNEO1FBRUQsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEVBQThFLENBQUMsQ0FBQztTQUNoRzthQUFNO1lBQ0gsS0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGNBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV0RCxJQUFJLE1BQU0sRUFBRTtnQkFDUixLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzthQUN4QjtpQkFBTTtnQkFDSCxLQUFJLENBQUMsTUFBTSxHQUFHLHlDQUFhLEVBQUUsQ0FBQzthQUNqQztTQUNKOztJQUNMLENBQUM7SUFFTyxtQ0FBYyxHQUF0QixVQUF1QixRQUFnQixFQUFFLFNBQWlCO1FBQ3RELE9BQU8scUNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLHlDQUFvQixHQUE1QixVQUE2QixJQUFZO1FBQ3JDLE9BQU8sMkNBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsa0NBQWEsR0FBYjtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFDL0IsSUFBSSxPQUFPLEdBQVcsRUFBRSxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQUs7Z0JBQ3RCLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNqQixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDM0M7eUJBQU07d0JBQ0gsT0FBTyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQy9CLFdBQVcsR0FBRyxFQUFFLENBQUM7d0JBRWpCLEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ2pDO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxpQ0FBWSxHQUFaO1FBQ0ksSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFTyxvQ0FBZSxHQUF2QixVQUF3QixJQUFZO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFqRUQsQ0FBZ0MscUJBQVksR0FpRTNDO0FBakVZLGdDQUFVIn0=