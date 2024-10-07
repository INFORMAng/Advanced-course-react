import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/config/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()