"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixin = void 0;
function mixin(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
        });
    });
}
exports.mixin = mixin;
//# sourceMappingURL=mixin.js.map