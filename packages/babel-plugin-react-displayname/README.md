# babel-plugin-react-displayname

Enable better debugging of minified, production-optimized builds with React DevTools by adding a `displayName` to components.

## Usage

Add `babel-plugin-react-displayname` to your babel config:

```json
{
  "plugins": [
    "babel-plugin-react-displayname"
  ]
}
```

## Example

Input:

```jsx
const Simple = () => <div>test</div>;
```

Output:

```jsx
const Simple = () => React.createElement("div", null, "test");

Simple.displayName = "Simple";
```
