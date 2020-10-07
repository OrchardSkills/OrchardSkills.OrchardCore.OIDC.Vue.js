
import Oidc from './config/authService'

export const createSingleton = (createInstance) => {
  let instance; return {
    getInstance: () => instance || (instance = createInstance())
  }
}
