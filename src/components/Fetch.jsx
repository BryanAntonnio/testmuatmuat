import React, { useEffect, useState } from "react";

const Fetch = () => {
    const [abilities, setAbilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch("https://pokeapi.co/api/v2/ability")
            .then((response) => response.json())
            .then((data) => {
                setAbilities(data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching abilities:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading abilities...</div>;
    }

    return(
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pokemon Abilities</h1>
            <ul className="list-disc pl-5">
                {abilities.map((ability) => (
                    <li key={ability.name} className="mb-2">
                        <button
                            className="text-blue-500 hover:underline"
                        >
                            {ability.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        
    );
}

export default Fetch;