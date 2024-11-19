import { useSelector } from "react-redux";
import "./TotalProducts.css";
import { AppState } from "../../../Redux/store";

export function TotalProducts(): JSX.Element {

    // Registering to the global state and getting product count:
    const count = useSelector<AppState, number>(store => store.products?.length || 0);

    return (
        <div className="TotalProducts">
            {count > 0 && <span className="border">Total Products: {count}</span>}
        </div>
    );
}
