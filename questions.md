1. What is the difference between Component and PureComponent? Give an example where it might break my app.

- component : A regular component in react re-render whenever its parent component re-render, regardless
of whether its props or state have changed or not.

- PureComponent :Pure Component is similar to react-component, but it implements a shallow comparison
of props and states and it will only re-renders if they have changed . it is used for performance improvements 
where component frequently render with same props and state.

Example where it might break our app: the props passed to a pureComponent is complex objects or arrays,     shallow comparison might now detect changes.in such cases pureComponent might not re-render when it should.

---

2. Context + ShouldComponentUpdate might be dangerous. Why is that?
    - This might be dangerous because shouldComponentUpdate is used to optimize rendering by unnecessary 
    re-render but it can cause issues when  used with context because when it updates there might be a case when
    trigger will not happen  when context changes .it can block context propagation.

---

3. Describe 3 ways to pass information from a component to its PARENT.
   - callback functions: pass a function as a prop to the child component, which the child component can call to send information back to parent
   - Props: update parent state directly by passing props down to the child component and modifying the parent state.
   - context: To send data from a parent component to its offspring, use the React Context API.

---

4. Give 2 ways to prevent components from re-rendering.
   - memo or memoization : this will prevent react to prevent rerendering if props has not changed
   - shouldComponentUpdate: implement shouldComponentUpdate lifecycle method to control when component rerender.
   - PureComponent: It perform shallow comparison of state and props

---

5. What is a fragment and why do we need it? Give an example where it might break my app.
    - Fragment is a way to group multiple children elements without adding extra nodes to the DOM.
    - it might break your app when it is not properly closed or nested within other elements incorrectly.

---

6. Give 3 examples of the HOC pattern.
    - State Management:when using context we wrap the app into <context.provider> and when we use redux we wrap it in <store>
    - caching and memoization : we can use caching and memoization library eg.PersistGate
    - Authorization : use can authenticate the user before accessing some protected routes.


---

7. What's the difference in handling exceptions in promises, callbacks and async...await?

    - promises : Errors in promises are handled by the catch() method or by chaining a .then() with a
    second callback function to handle errors.
    - callbacks: Errors in callback is handled by the error-first callback function. cb(error,data)
    - async-await: Errors in async await are handled by using try/catch blocks.

---

8. How many arguments does setState take and why is it async.

    - setState has two arguments.first argument is the object containing the new updated state and the second argument is the callback which will execute once state has been updated. it is async because that's how the react works, it will batch all the updates in one and will later update the state.This can improve the performance of the application and prevent unnecessary-rerenders.

---

9. List the steps needed to migrate a Class to Function Component.

    - Remove constructor: remove the constructor .
    - identify State : Determine which state variable are used in component
    - convert lifecycle methods: Replace the shouldComponentUpdate,componentDidMount,ComponentDidUpdate to appropriate hook.
    - convert class properties: Replace this.state,this.props with useState and props directly.
    - Remove render() method
    - Don't remove return we can use it in Function Component
    - Use React hooks properly: For some logic you can create custom hooks or use existing hooks for the good performance
    - Test the changes

---

10. List a few ways styles can be used with components.

    - inline styling: Define styles directly in the JSX using the style attribute
    - CSS Modules : using CSS Modules and apply to different component.
    - Styled-components: use styled-components library to define component specific styles
    - Normal CSS or external css

---

11. How to render an HTML string coming from the server.
    -   To render a HTML string coming from the server we can use dangerouslySetInnerHTML attribute.

---
