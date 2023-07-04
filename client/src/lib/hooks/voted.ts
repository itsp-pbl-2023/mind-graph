import { useContext } from "react"
import { VotedContext } from "./voted.tsx"

export const useVoted = ():string[] => {
  const { voted } = useContext(VotedContext)
  if (voted == undefined){
    return []
  }
  else{
    return voted
  }
}

export const useSetVoted = () => {
  const { setVoted } = useContext(VotedContext)
  return setVoted
}
