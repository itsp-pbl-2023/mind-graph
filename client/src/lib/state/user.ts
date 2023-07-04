let userID: string | undefined

export const getUserID = () => userID
export const setUserID = (id: string | undefined) => {
  userID = id
}
