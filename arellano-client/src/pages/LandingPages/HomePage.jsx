import Button from "../../components/Button";
import fairyImage from "../../assets/images/fairy-hero.jpg";
import plantImage from "../../assets/images/plant.jpg";
import fairyPlace from "../../assets/images/fairy-place.jpg";
import loveFairy from "../../assets/images/blog.jpg";

const HomePage = () => {
  return (
    <div className="bg-[#6B8754] green-700 min-h-screen">
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Enchanted Realm
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Explore the Magical World of Fairies & Plants
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Discover secret gardens, mystical creatures, and the hidden life of enchanted plants. Dive into a world where fairies nurture every leaf and bloom with magic.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">Learn More</Button>
            </div>
          </div>

          <div className="rounded-3xl border-zinc-300">
            <img src={loveFairy} alt="love Fairy" className="h-80 w-full object-cover rounded-2xl"/>
          </div>

        </div>
      </section>

      {/* Revise and Expand the content | Enhancement 2:DONE ꩜ */} 
      <section className="border-y-2 border-zinc-900 bg-[#bac193] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-800">
            Fairyland Stats
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Quick Overview</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-zinc-900 bg-zinc-100 p-5
            shadow-[0_0_10px_rgba(107,135,84,0.4),0_0_30px_rgba(107,135,84,0.3)]
            hover:shadow-[0_0_20px_rgba(107,135,84,0.7),0_0_50px_rgba(107,135,84,0.5)]
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]">
            <p className="text-2xl font-bold text-zinc-900">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Magical Plants</p>
          </div>
          <div className="rounded-3xl border border-zinc-900 bg-[#dfb2b9] p-5
            shadow-[0_0_10px_rgba(107,135,84,0.4),0_0_30px_rgba(107,135,84,0.3)]
            hover:shadow-[0_0_20px_rgba(107,135,84,0.7),0_0_50px_rgba(107,135,84,0.5)]
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]">
            <p className="text-2xl font-bold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">Fairy Species</p>
          </div>
          <div className="rounded-3xl border border-zinc-900 bg-zinc-100 p-5
            shadow-[0_0_10px_rgba(107,135,84,0.4),0_0_30px_rgba(107,135,84,0.3)]
            hover:shadow-[0_0_20px_rgba(107,135,84,0.7),0_0_50px_rgba(107,135,84,0.5)]
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]">
            <p className="text-2xl font-bold text-zinc-900">8</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Mystical Locations</p>
          </div>
          <div className="rounded-3xl border border-zinc-900 bg-[#dfb2b9] p-5
            shadow-[0_0_10px_rgba(107,135,84,0.4),0_0_30px_rgba(107,135,84,0.3)]
            hover:shadow-[0_0_20px_rgba(107,135,84,0.7),0_0_50px_rgba(107,135,84,0.5)]
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]">
            <p className="text-2xl font-bold text-zinc-900">5</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">Enchanted Objects</p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Discoveries
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Enchanted Cards</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={plantImage} alt="Mystical Plant" className="h-50 w-full object-cover rounded-xl"/>
            <h3 className="mt-3 text-lg font-semibold text-zinc-900">Whispering Fern</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A rare fern that communicates with forest fairies at twilight and glows softly in the moonlight.
            </p>
            <Button className="mt-4" variant="primary">View More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={fairyImage} alt="Forest Fairy" className="h-50 w-full object-cover rounded-xl"/>
            <h3 className="mt-3 text-lg font-semibold text-zinc-900">Forest Fairy</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Mischievous and tiny, fairies protect the enchanted woods from harm.
            </p>
            <Button className="mt-4" variant="primary">View More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img src={fairyPlace} alt="Forest Fairy" className="h-50 w-full object-cover rounded-xl"/>
            <h3 className="mt-3 text-lg font-semibold text-zinc-900">Hidden Glade</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A secret clearing where fairies gather and plants glow in moonlight.
            </p>
            <Button className="mt-4" variant="primary">View More</Button>
          </article>
        </div>
      </section>
    </div>
</div>
  );
};

export default HomePage;