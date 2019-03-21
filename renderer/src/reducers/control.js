import { SET_SCRAPY } from '../types'

const initialState = {
  isScrapying: 0
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SCRAPY:
      return { isScrapying: state.isScrapying + payload }
    default:
      return state
  }
}
