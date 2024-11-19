import { useForm } from "react-hook-form";
import "./AddProduct.css";
import { ProductModel } from "../../../Models/ProductModel";
import { productService } from "../../../Services/TaskService";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";

export function AddProduct(): JSX.Element {

    const { register, handleSubmit } = useForm<ProductModel>();

    const navigate = useNavigate();

    async function send(product: ProductModel) {
        try {
            product.image = (product.image as unknown as FileList)[0];
            await productService.addProduct(product);
            notify.success("Product has been added.");
            navigate("/products"); // Navigate to product page.
        }
        catch(err: any) {
            notify.error(errorHandler.getError(err));
        }
    }

    return (
        <div className="AddProduct">

			<form onSubmit={handleSubmit(send)}>

                <label>Name: </label>
                <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                <label>Price: </label>
                <input type="number" {...register("price")} required min={0} max={1000} />

                <label>Stock: </label>
                <input type="number" {...register("stock")} required min={0} max={1000} />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Add</button>

            </form>
        </div>
    );
}
