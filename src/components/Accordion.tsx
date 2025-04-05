import { useState } from 'react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {items.map((item, index) => (
        <div key={index} className="mb-2">
          <button
            onClick={() => handleClick(index)}
            className="w-full px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-in-out rounded-t-lg"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{item.title}</span>
              <span className="transform transition-transform duration-300 text-gray-800">
                {activeIndex === index ? '−' : '+'}
              </span>
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-4 bg-white border border-t-0 rounded-b-lg text-gray-700">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion; 