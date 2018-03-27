import { observable } from './observable';

export function fakeHttpResponse<T>(data: T) {
  return observable({
    json: function() {
      const text = JSON.stringify({ data: data });
      return JSON.parse(text);
    }
  });
}
