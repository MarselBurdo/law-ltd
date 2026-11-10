import { useState } from 'react';
import { withBase } from '../lib/paths';

type ServiceCard = {
  slug: string;
  number: string;
  title: string;
  category: string;
  label: string;
  description: string;
};

const filters = [
  { value: 'all', label: 'Все направления' },
  { value: 'business', label: 'Для бизнеса' },
  { value: 'personal', label: 'Для частных лиц' },
];

export default function PracticeAreas({ services }: { services: ServiceCard[] }) {
  const [category, setCategory] = useState('all');
  const visible = services.filter((service) => category === 'all' || service.category === category);

  return (
    <div>
      <div className="practice-filters" role="group" aria-label="Выбрать направление практики">
        {filters.map((filter) => (
          <button key={filter.value} type="button" aria-pressed={category === filter.value} onClick={() => setCategory(filter.value)}>
            {filter.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">Показано направлений: {visible.length}</p>
      <div className="practice-grid">
        {visible.map((service) => (
          <a className="practice-card" href={withBase(`/practice/${service.slug}/`)} key={service.slug}>
            <div className="flex items-center justify-between gap-4"><span className="card-number">{service.number}</span><span className="card-category">{service.label}</span></div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className="card-link">Подробнее <span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
    </div>
  );
}
