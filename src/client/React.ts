export const ReactDOM = (function () {
  let _container: HTMLElement
  let _Component: () => HTMLElement

  return {
    update() {
      this.render(_container, _Component)
    },
    render(container: HTMLElement, Component: () => HTMLElement) {
      _container = container
      _Component = Component
      // @ts-ignore
      const focusedElementId = document.activeElement.id
      // @ts-ignore
      const focusedElementSelectionStart = document.activeElement.selectionStart
      // @ts-ignore
      const focusedElementSelectionEnd = document.activeElement.selectionEnd
      // @ts-ignore
      const componentDOM = React.render(Component)
      // @ts-ignore
      container.replaceChildren()
      container.appendChild(componentDOM)

      if (focusedElementId) {
        const focusedElement = document.getElementById(focusedElementId)
        // @ts-ignore
        focusedElement.focus()
        // @ts-ignore
        focusedElement.selectionStart = focusedElementSelectionStart
        // @ts-ignore
        focusedElement.selectionEnd = focusedElementSelectionEnd
      }
    },
  }
})()
export const React = (() => {
  let hooks: any[] = []
  let currentIndex = 0

  return {
    render(Component: () => HTMLElement) {
      currentIndex = 0;

      const Comp = Component();
      return Comp;
    },
    useState: <T>(defaultValue: T): [T, (newVal: T) => void] => {
      const useStateIndex = currentIndex
      hooks[useStateIndex] = hooks[useStateIndex] ?? defaultValue
      const setValue = (newValue: T) => {
        hooks[useStateIndex] = newValue
        ReactDOM.update()
      }
      currentIndex++
      return [hooks[useStateIndex], setValue]
    },
    // @ts-ignore
    useEffect: (callback: () => void, nextDeps: any[]) => {
      const hasDeps = typeof nextDeps !== "undefined"
      const prevDeps = hooks[currentIndex]
      const hasChangedDeps = prevDeps
        ? nextDeps.some((dep, i) => dep !== prevDeps[i])
        : true
      if (!hasDeps || hasChangedDeps) {
        hooks[currentIndex] = nextDeps
        callback()
      }
      currentIndex++
    },
    useReducer<State, Action>(
      reducer: (prevState: State, action: Action) => State,
      initialState: State
    ): [State, (action: Action) => void] {
      const useReducerIndex = currentIndex
      currentIndex++

      hooks[useReducerIndex] = hooks[useReducerIndex] ?? initialState

      const dispatch = (action: Action) => {
        const newState = reducer(hooks[useReducerIndex], action)
        hooks[useReducerIndex] = newState
        ReactDOM.update()
      }

      return [hooks[useReducerIndex], dispatch]
    },
  }
})()