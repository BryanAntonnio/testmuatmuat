import React from "react";

const ProductGrid = ({ products, loading, onEdit, onDelete }) => {
    if (loading) return <p>Loading...</p>;
    if (products.length === 0) return <p className="border p-4 rounded shadow">No products available</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
            {products.map((p) => (
                <div key={p.id} className="border p-4 rounded shadow">
                    <img src={p.image} alt={p.name} className="w-full h-48 object-cover mb-2" />
                    <h4 className="text-lg font-bold">{p.name}</h4>
                    <p>Price: Rp. {p.price}</p>
                    <p>Stock: {p.stock}</p>

                    
                    <div className="flex justify-between mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => onEdit(p)}>
                            Edit
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => onDelete(p.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductGrid;