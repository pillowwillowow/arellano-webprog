import Button from '../components/Button';
import moonflowerImage from "../images/moonflower.jpg";
import lotusImage from "../images/lotus.jpg";
import bluebellImage from "../images/bluebell.jpg";
import orchidImage from "../images/orchid.jpg";

const ArticlePage = () => {
  return (
    <div className="flex w-full bg-[#6B8754] flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Magical Forest Tales
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Dive into stories about fairies, enchanted plants, and mystical gardens through these featured articles.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* Revise and Expand the content | Enhancement 2:DONE ꩜ */} 
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900"> ᭄᭡ Fairy-like Plants to Have  ᭄᭡ </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={lotusImage} alt="Lotus Plant" className="h-32 w-full object-cover rounded-xl"/>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Article 01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">The Magical Lotus</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
            The lotus flower generally symbolizes purity, rebirth, resilience, and spiritual enlightenment, as it rises untainted from mud to bloom beautifully. It is a sacred symbol in Buddhism and Hinduism, representing detachment, overcoming adversity, and the journey toward spiritual awareness. 
            Colors vary in meaning, with white representing purity and pink representing Buddha.
            </p>
            <Button className="mt-4">Read More</Button>
        </article>

        <article className="flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={orchidImage} alt="Orchid" className="h-32 w-full object-cover rounded-xl"/>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Article 02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">The Powerful Orchid</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
            Orchids generally symbolize love, luxury, beauty, and strength, representing refinement and rare, delicate beauty across cultures. Historically associated with fertility and virility, they now often represent thoughtfulness, maturity, and charm. 
            Their exotic appearance makes them ideal for conveying deep affection or admiration. Read on to learn all about orchid symbolism and more!
            </p>
            <Button className="mt-4">Read More</Button>
        </article>

        <article className="flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={bluebellImage} alt="Bluebells" className="h-32 w-full object-cover rounded-xl"/>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Article 03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">The Pretty Bluebell</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
            In the language of flowers, the bluebells flower meaning resembles humility, constancy, gratitude, and everlasting love. It is said that if you turn a bluebell flower inside out without tearing it, you will win the one you love, and if you wear a wreath of bluebells you will only be able to speak the truth. 
            Not only that but did you know it's referred to as the 'fairy flower'? Click to know more!</p>
            <Button className="mt-4">Read More</Button>
        </article>

        <article className="flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={moonflowerImage} alt="Moonflower" className="h-32 w-full object-cover rounded-xl"/>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Article 04
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">The Enchanted Moonflower</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
            The moonflower, also called the tropical white morning-glory, is a plant that blooms at night—hence its name! The plant is known for its white petals that slowly open as dark sets in. When daylight comes back, the long and thin petals curl back in and close upon itself as it waits for the night again. 
            It is a fascinating flower that you should get to know better! Click to know more...
            </p>
            <Button className="mt-4">Read More</Button>
        </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;