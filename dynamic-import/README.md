# Solution 01 - Inject components at buildtime

The first approach I took was to load another `external` module in the `index.html` file, like this

```html
<!-- External application -->
<script type="module" src="/external/entry.ts"></script>
<!-- ViteJS Main application -->
<script type="module" src="/src/main.tsx"></script> 
```
And this works fine, Rollup is able to bundle everything into one "bundle", but this prevents third party non-technical users to take this approach because they would have to have access to the main application. Plus, this defeats the purpose of the exercise itself, as you're not able to touch the app's code.

To expand a bit more here, this idea relies on a "rigid" structure for the component that's going to be used:

```text
external/
  entry.ts
  otherModules/
    more.tsx
    files.tsx
    here.tsx
```

Here, `external.ts` has to export a named export called `configuration` that has to follow this signature

```ts
interface EntryPointConfig {
  children: (() => JSX.Element) | null;
}
```

Which means that the consumer can do something like this
```ts
import { TheComponentToInject } from './OtherComponent';

export const configuration: EntryPointConfig = {
  children: TheComponentToInject,
};
```

Then, by using `Dynamic Imports`, the main application would load this file by doing:

```tsx
import { useEffect, useState } from 'react';

export const DynamicSlot = () => {
  const [component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        /**
         * This is where "the magic" happens, if it can't find anything, it will throw and then the
         * `component` state will remain as `null`, and the app won't render anything.
         */
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
```

## Conclusion

I decided to ditch this approach as it doesn't really address all the requirements. It was fun to experiment, but the fact that it leaves out non-technical users and makes the consumers "sort of" interact with the core application make it non-viable. 