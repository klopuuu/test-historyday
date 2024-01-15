import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { CHANGE_HIST } from "../store/reducers/reducer"

export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(CHANGE_HIST, dispatch)
}