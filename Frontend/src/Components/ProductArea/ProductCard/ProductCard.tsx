import { ProductModel } from "../../../Models/ProductModel";
import "./ProductCard.css";

type ProductCardProps = {
	product: ProductModel;
};

export function ProductCard(props: ProductCardProps): JSX.Element {
    return (
        <div className="ProductCard">
			<div>
                <span>{props.product.name}</span>
                <span>Price: {props.product.price}</span>
                <span>Stock: {props.product.stock}</span>
            </div>
            <div>
                <img src={props.product.imageUrl} />
            </div>
        </div>
    );
}
