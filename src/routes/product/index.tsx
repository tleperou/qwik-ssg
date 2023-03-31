import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, Link } from '@builder.io/qwik-city';

import Hero from '~/components/starter/hero/hero';

export default component$(() => {
  const src = useSignal<string>();

  useVisibleTask$(() => {
    src.value = 'https://picsum.photos/1200/550';
  });

  return (
    <>
      <Hero />

      <div class="section bright">
        <div class="container center">
          <Link href="/">Home</Link>
        </div>
      </div>

      <div class="section">
        <div class="container center">
          <img src={src.value} style="width: 100%; height: auto;" />
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
