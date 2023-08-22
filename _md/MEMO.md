## styled-components

to write css codes in jsx file

## state ※if Class Component

``` jsx

constructor() {
    this.state.someKey = "someValue"
}

this.setState({
    someKey: "NewSomeValue"
})

```

## state② ※if functional Component

``` jsx

import { useState } from 'react';

function SampleComponent() {
    const [counter, setCounter] = useState(0;);
    
    const increment = () => {
        setCounter(counter + 1);
    }
}


```

## dangerouslySetInnerHTML

## setState callback

```
handleButtonClicked = evt => {
    this.setState({name: evt.currentTarget.value}, () => {
        this.props.callback(this.state.name)
    })
}
```
## Performance Hooks

- useMemo
    - lets you cache the result of an expensive calculation
- useCallback
    - lets you cache a function definition before passing it down to an optimized component

## Component Generics

```
Component<PropsType, StateType>
```

## class

```
className={`logInArrow ${this.props.enteredState && "is-active"}`}
```

## to rename index.html for something like app.html

`npm run eject` and get full controll (this means cannot operate easily)

## dispatch

dispatchとはアクション（操作やイベント）が発生した際に、それを処理するための適切な処理手段や関数を呼び出すこと

## alternative to Switch in PHP

```
 $result = match ($input) {
     1 => 'one',
     2 => 'two',
     default => 'unknown',
 };
```

## optional chain in PHP

```
$result = $user?->getAddress()?->getCountry();
```

## named argument in PHP

```
function foo(string $a, int $b, bool $c): void { /* ... */ }
foo(a: 'test', b: 42, c: true);
```

## @

the wrong sentense with where @ symbol at the beginning is ignored by PHP error handler so an error is not thrown.

## useEffect()

関数の実行タイミングをReactのレンダリング後まで遅らせるhook

## react-router

```
import { Link } from "react-router-dom";

<Link to="home" className="logInArrow" aria-disabled={`${props.enteredState ? "true" : "false"}`}>
</Link>
```

## JSXを関数内で使う注意点

- コンポーネント（JSX）を関数内で条件分岐して、return内でその関数の戻り値としてレンダリングさせたい場合、関数内の記述は一連の流れになっていないと同期が取れない
    - function componentではlet変数によって関数を跨ぐ変数の操作は止めた方が良いかも

例）App.tsx＞getFirstPage()
