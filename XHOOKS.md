

**Hooks** allow you to tie or request specific information to your component. For instance, components that want to participate in the renderloop can use [`useFrame`](https://docs.pmnd.rs/react-three-fiber/api/hooks), components that need to be informed of three.js specifics can use `useThree` and so on. All hooks clean up after themselves once the component unmounts.

Hooks can only be used inside the Canvas element because they rely on context!

**❌ You cannot expect something like this to work**
```
import { useThree } from '@react-three/fiber'

function App() {
  const { size } = useThree() // This will just crash
  return (
    <Canvas>
      <mesh>
```
**✅ Do this instead**

```
function Foo() {
  const { size } = useThree()
  ...
}

function App() {
  return (
    <Canvas>
```


## useFrame
This hook allows you to execute code on every rendered frame, like running effects, updating controls, and so on. You receive the state (same as `useThree`) and a clock delta. Your callback function will be invoked just before a frame is rendered. When the component unmounts it is unsubscribed automatically from the render-loop.

> Note : Be careful about what you do inside `useFrame`! You should never `setState` in there! Your calculations should be slim and you should mind all the commonly known pitfalls when dealing with loops in general, like re-use of variables, etc.
