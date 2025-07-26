import React, { useEffect, useState } from "react";

const FetchDetail = ({ abilityName="battle-armor" }) => {
    const [effects, setEffects] = useState([]);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`)
            .then((response) => response.json())
            .then((data) => {
                setEffects(data.effect_entries);
            })
            .catch((error) => {
                console.error("Error fetching ability details:", error);
            });
    }, [abilityName]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Ability: {abilityName}</h1>
            <ul className="list-disc pl-5">
                {effects.map((effect, index) => (
                    <li key={index} className="mb-2">
                        {effect.effect}
                    </li>
                ))}
            </ul>
            </div>
    );
}

export default FetchDetail;