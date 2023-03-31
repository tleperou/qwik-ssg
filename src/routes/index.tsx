import { component$, useId, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city';

import Hero from '~/components/starter/hero/hero';

type Person = { name: string };

export const usePerson = routeLoader$(async () => {
  const res = await fetch('https://swapi.dev/api/people/1/');
  const data = await res.json();
  return data as Person;
})

export default component$(() => {
  const person = usePerson();
  const people = useSignal<Person[]>();

  useVisibleTask$(async () => {
    const res = await fetch('https://swapi.dev/api/people');
    const { results } = await res.json();
    people.value = results;
  });

  return (
    <>
      <Hero />

      <div class="section bright">
        <div class="container center">
          <Link href="/product">{person.value.name}</Link>
        </div>
      </div>

      <div class="section">
        <div class="container center">
          <ul>
            {people.value?.map((person) => (
              <li key={useId()}>
                {person.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
