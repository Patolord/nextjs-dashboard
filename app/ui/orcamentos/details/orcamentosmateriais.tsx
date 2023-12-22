import React from 'react';

interface QuoteMaterialsProps {
  quote: {
  id: number;
  ref_id: string;
  name: string;
  estimated_cost: number;
  Client: {
    name: string;
    image_url: string;
  },
  start_date: Date;
  status: string; 
  quote_materials: {
      material_id: number;
      quantity: number;
      Material: {
        name: string;
      };
      price_id: number;
    }[];
  };
}

export function QuoteMaterials({ quote }: QuoteMaterialsProps) {
  if (!quote || !quote.quote_materials) {
    return <div>No materials found for this quote.</div>;
  }

  return (
    <div>
      {quote.quote_materials.map((material: any, index: number) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div>Material ID: {material.material_id}</div>
          <div>Quantity: {material.quantity}</div>
          <div>Name: {material.Material.name}</div>
          <div>Price ID: {material.price_id}</div>
        </div>
      ))}
    </div>
  );
}
