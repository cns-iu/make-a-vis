
/**
 * A decorator that allows a property to store data, but not be written to JSON
 */
export function Transient(target: any, key: string) {
  if (delete target[key]) {
    const cacheKey = `__HIDDEN_${key}__`;

    Object.defineProperty(target, key, {
      get: function() {
        return this[cacheKey];
      },
      set: function(value) {
        if (this.hasOwnProperty(cacheKey)) {
          this[cacheKey] = value;
        } else {
          Object.defineProperty(this, cacheKey, {
            configurable: false,
            enumerable: false,
            writable: true,
            value
          });
        }
      },
      enumerable: false,
      configurable: false,
    });
  }
}
