import { useEffect, useState, } from "react"
import { useLoaderData } from "react-router-dom"
import type { Product } from "../types"
import { Link, NavLink, Outlet } from "react-router-dom";
import ProductDetails from './ProductDetails.tsx'

export const productListLoader = async () => {
        const response = await fetch("http://localhost:3000/products");
        if(!response.ok) {
            throw new Error(response.statusText)
} else {
        const data = await response.json();
        return data
    }
}
 

export default function ProductList() {
    
    const products = useLoaderData() as Product[]
    
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const [error, setError] = useState<null | string>(null)


    const addToCart = async (productId: number) => {
        const newCartItem = {
          productId: productId,
          amount: 1
        }
        // make the change on the back end
        setIsAddingToCart(true)
        try {
        const response = await fetch ("http://localhost:3000/cart", {
          method: "POST",
          body: JSON.stringify(newCartItem),
          headers: {
            "Content-Type": "application/json"
          }
        })
        if (!response.ok) {
            setError(response.statusText)
        } 
    } catch (error: any) {

    }
    setIsAddingToCart(false)
       

      }
    return (
        <>
        <h2 className="display-5 mb-4">Hungry for some snacks?</h2>
        <div className="d-flex flex-wrap gap-3">
            { error && <p className="text-danger">{error}</p>}
        { products.map(product => (
          <div className="card flex-grow=1" key={product.id}>
           <div className ="card-body">
             <h3 className= "card-title">{ product.name }</h3>
               <p className="card-text">{ product.brand }</p>
               <p><Link to={"/products/" + product.id}>Details</Link></p>
               <button className="btn btn-success" 
               disabled={isAddingToCart}
               onClick={() => addToCart(product.id)}
               >
                { isAddingToCart ? "adding..." :
                "$" + product.price.toFixed(2) }</button>
        </div>
     </div>   
    )) }
  </div>
  </>
)
}