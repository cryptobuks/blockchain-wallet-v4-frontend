
export const makeReducer = (init, actions) => (state = init, action) => {
  let reduce = actions[action.type]
  return reduce ? reduce(state, action) : state
}

export const makeNamespace = (namespace) => (type) => `${namespace}.${type}`
