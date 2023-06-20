export interface Result {
  chosenNodeID: string
  mvpUserID: string
  myScore: number
}

let result: Result | undefined

export const getResult = () => result
export const setResult = (res: Result) => {
  result = res
}
