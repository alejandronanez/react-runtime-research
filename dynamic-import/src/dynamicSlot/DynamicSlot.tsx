import { useEffect, useState } from 'react';

export const DynamicSlot = () => {
  const [component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const module = await import('../../external/entry');
        if (module.configuration.children) {
          setComponent(module.configuration.children());
        }
      } catch (e) {
        console.log('oops');
      }
    };

    void loadComponent();
  }, []);

  if (!component) {
    return null;
  }

  return (
    <div className="slot" id="slot">
      {component}
    </div>
  );
};
