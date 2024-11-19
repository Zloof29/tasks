import { useEffect, useState } from "react";
import "./ProductList.css";
import { productService } from "../../../Services/TaskService";
import { ProductModel } from "../../../Models/ProductModel";
import { ProductCard } from "../ProductCard/ProductCard";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";

export function ProductList(): JSX.Element {

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        productService.getAllProducts()
            .then(products => setProducts(products))
            .catch(err => notify.error(errorHandler.getError(err)));
    }, []);

    return (
        <div className="ProductList">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    );
}
