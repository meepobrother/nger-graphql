import { Controller, Version } from '@nger/core';
import { Query } from './decorators'
@Controller()
export class VersionController {
    constructor(private _version: Version) { }

    @Query()
    version(): Version {
        return this._version
    }
}
