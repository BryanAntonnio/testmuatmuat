import React, { useState, useEffect} from "react";

const ProductForm = ({ onSave, isEditing, initialData, products}) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setPrice(initialData.price);
            setImage(initialData.image);
            setStock(initialData.stock);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !price || !image || !stock) {
            alert("Please fill in all fields");
            return;
        }

        if (price <0){
            alert("Price must be positive");
            return;
        }

        if (stock <= 0) {
            alert("Stock must be positive or greater than zero");
            return;
        }
    

        const isDuplicate = products.some(
            (product) => product.name.toLowerCase().trim() === name.toLowerCase().trim() &&
            (!initialData || product.id !== initialData.id)
        );

        if (isDuplicate) {
            alert("Product already exists");
            return;
        }

        onSave({
            id: initialData ? initialData.id : Date.now(),
            name,
            price: parseFloat(+ price),
            image,
            stock: parseInt(+ stock)
        });

        setName("");
        setImage("");
        setPrice("");
        setStock("");
        setError("");

    }

        return(
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <h1 className="text-lg font-bold mb-4 flex justify-center">
            {isEditing ? "Edit Product" : "Add Product"}
            </h1>


            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                />
            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                {isEditing ? "Update Product" : "Add Product"}
            </button>
            </form>
        )
    
    };

    export default ProductForm;