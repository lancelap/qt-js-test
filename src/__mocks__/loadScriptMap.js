const mock = function loadScriptMap(url) {
  const mockedCallback = () => Promise.resolve({
    Map: class {
      constructor() {
        this.Polyline = class {
          constructor() {
            this.geometry = {
              setCoordinates: jest.fn
            };
          }
        };

        this.Placemark = class {
          constructor(geometry, properties, options) {
            this.geometry = geometry;
            this.properties = properties;
            this.options = options;
            this.events = {
              add: jest.fn,
              remove: jest.fn
            };
          }
        };
      }
    }
  });
  const promise = Promise.resolve().then(mockedCallback);
  return promise; 
};

export default mock;
