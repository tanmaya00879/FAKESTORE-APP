import axios from "axios";
import { useEffect, useState } from "react";

export function FakeStoreApi() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState([cartItems.length])

  function loadCategories() {
    axios.get("https://fakestoreapi.com/products/categories").then((response) => {
      response.data.unshift("all");
      setCategories(response.data);
    });
  }

  function loadProducts(url) {
    axios.get(url).then((response) => {
      setProducts(response.data);
    });
  }

  function handleCategoryChange(e) {
    const value = e.target.value;
    fetchCategory(value);
  }

  function fetchCategory(category) {
    if (category === "all") {
      loadProducts("https://fakestoreapi.com/products");
    } else {
      loadProducts(`https://fakestoreapi.com/products/category/${category}`);
    }
  }

  function handleToCartClick(product) {
    setCartItems([...cartItems, product]);
    setCartCount(cartItems.length)
    alert(`${product.title}\nadded to cart`);
  }

  useEffect(() => {
    loadCategories();
    loadProducts("https://fakestoreapi.com/products");
  }, []);

  return (
    <div className="container-fluid">
      <header className="d-flex justify-content-between bg-light p-3">
        <div className="h3">Fakestore.</div>
        <div>
          <span style={{ cursor: "pointer" }} onClick={() => fetchCategory("all")}>Home</span>
          <span className="mx-4" style={{ cursor: "pointer" }} onClick={() => fetchCategory("electronics")}>Electronics</span>
          <span style={{ cursor: "pointer" }} onClick={() => fetchCategory("jewelery")}>Jewelry</span>
        </div>
        <div>
          <button className=" btn bi bi-cart4 position-relative ">
            <span className="badge bg-danger position-absolute rounded rounded-circle ">{cartCount}</span>
          </button>
        </div>
      </header>

      <section className="mt-4 row">
        <nav className="col-2">
          <div>
            <label className="form-label fw-bold">Select Category</label>
            <div>
              <select className="form-select" onChange={handleCategoryChange}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>

        <main className="col-10 d-flex flex-wrap overflow-auto" style={{ height: "600px" }}>
          {products.map((product) => (
            <div key={product.id} className="card m-2 p-2" style={{ width: "200px" }}>
              <img height="140px" className="card-img-top" src={product.image} alt="" />
              <div className="card-header" style={{ height: "140px" }}>
                {product.title}
              </div>
              <div className="card-body">
                <dl>
                  <dt>Price</dt>
                  <dd>${product.price}</dd>
                  <dt>Rating</dt>
                  <dd>
                    {product.rating.rate}
                    <span className="bi bi-star-fill text-success"></span>
                  </dd>
                </dl>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => handleToCartClick(product)}
                  className="bi bi-cart4 btn btn-warning"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </section>
    </div>
  );
}