import { Controller, Version } from '@nger/core';
@Controller()
export class VersionController {
    constructor(private _version: Version) { }
    version(): Version {
        return this._version
    }
}
