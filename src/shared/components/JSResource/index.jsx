// @flow

const resourceMap: Map<string, JSLoadableResource<any>> = new Map();

class JSLoadableResource<T> {
  _error: ?Error;
  _loader: () => Promise<T>;
  _promise: ?Promise<T>;
  _result: ?T;

  constructor(loader: () => Promise<T>) {
    this._error = null;
    this._loader = loader;
    this._promise = null;
    this._result = null;
  }

  /**
   * Loads the resource if necessary.
   */
  load(): Promise<T> {
    let promise = this._promise;
    if (promise == null) {
      promise = this._loader()
        .then((result) => {
          // $FlowExpectedError
          if (result.default) {
            result = result.default;
          }
          this._result = result;
          return result;
        })
        .catch((error) => {
          this._error = error;
          throw error;
        });
      this._promise = promise;
    }
    return promise;
  }

  /**
   * Returns the result, if available. This can be useful to check if the value
   * is resolved yet.
   */
  get(): ?T {
    if (this._result != null) {
      return this._result;
    }
  }

  /**
   * This is the key method for integrating with React Suspense. Read will:
   * - "Suspend" if the resource is still pending (currently implemented as
   *   throwing a Promise, though this is subject to change in future
   *   versions of React)
   * - Throw an error if the resource failed to load.
   * - Return the data of the resource if available.
   */
  read(): T {
    if (this._result != null) {
      return this._result;
    } else if (this._error != null) {
      throw this._error;
    } else {
      throw this._promise;
    }
  }
}

export default function JSResource<T>(
  moduleId: string,
  loader: () => Promise<T>
): JSLoadableResource<T> {
  let resource = resourceMap.get(moduleId);
  if (resource == null) {
    resource = new JSLoadableResource(loader);
    resourceMap.set(moduleId, resource);
  }
  return resource;
}
