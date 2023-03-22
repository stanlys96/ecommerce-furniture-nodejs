import Product from "../models/product";

class ProductController {
  static async getAllProducts(req: any, res: any, next: any) {
    try {
      const data = await Product.getAllProducts();
      res.status(200).json(data?.rows);
    } catch (e) {
      console.log(e);
    }
  }
}

export default ProductController;
