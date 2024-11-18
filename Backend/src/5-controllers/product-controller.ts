import express, { Request, Response, NextFunction } from "express";

// Product controller - listening to product requests:
class ProductController {

    // Creating a router object:
    public readonly router = express.Router();

    // Register routes: 
    public constructor() {
        this.router.get("/products", this.getAllProducts);
    }

    // Get all products: 
    private async getAllProducts(request: Request, response: Response, next: NextFunction) {
    }
}

export const productController = new ProductController();
