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
      Price: {
        price: number;
      };}[];
  
  
  };
}

function formatCurrency2(amount: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
}

export function QuoteMaterials({ quote }: QuoteMaterialsProps) {

 
  if (!quote || !quote.quote_materials) {
    return <div>No materials found for this quote.</div>;
  }

  

  return (
    <div className="overflow-x-auto">
    <table className="min-w-full leading-normal">
        <thead>
            <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Material ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantidade
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Descrição
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Verba
                </th>
            </tr>
        </thead>
        <tbody>
            {quote.quote_materials.map((material, index: number) => (
                <tr key={index} className="hover:bg-gray-100">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {material.material_id}
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {material.quantity}
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {material.Material.name}
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {formatCurrency2(material.Price.price)}
                        </p>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

  );
}
