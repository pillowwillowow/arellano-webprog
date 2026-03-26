import Button from "../components/Button";
import fairyImage from "../images/moodboard.jpg"; 
import beatopia from "../images/beatopia.jpg"; 
import moodboard2 from "../images/moodboard2.jpg";
import moodboard3 from "../images/moodboard3.jpg";
import bloom from "../images/bloom.jpg";

const AboutPage = () => {
  return (
    <div className="flex w-full bg-[#6B8754] flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-dashed border-zinc-300 bg-zinc-100 p-6">
            <img src={bloom} alt="Enchanted Plant" className="h-72 w-full object-cover rounded-2xl"/>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Guardians of the Forest
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Discover how fairies and magical plants coexist in a mystical ecosystem. This page explores the enchanted beings, secret groves, and the wonders of plant life nurtured by fairies.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Forest Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Magical Summary</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">05</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Years of Discovery</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">16</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Enchanted Projects</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">09</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Fairy Clients</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Focus Areas</p>
          </div>
        </div>
      </section>

      {/* Revise and Expand the content | Enhancement 2:DONE ꩜ */} 
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

        <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Enchanted Content
        </p>
        <h2 className="mt-2 text-4xl font-semibold text-zinc-900">Stories & Discoveries</h2>

        <div className="mt-6 space-y-4">
            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <h3 className="text-lg font-bold text-zinc-900">Introduction</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
                Step into the magical world of fairies, where tiny glowing beings flutter between flowers and ancient trees. Learn the basics about fairy habitats, from sparkling mushroom rings to hidden glades, and how magical plants like moonflowers and enchanted lotuses thrive alongside them. Discover the symbiotic relationship between fairies and plants, as each supports the growth, protection, and magical energy of the other.
            </p>
            </article>

            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <h3 className="text-lg font-bold text-zinc-900">Experiences</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
                Explore enchanted gardens and forest layouts that are alive with mystical energy. Observe the patterns of glowing petals, winding vines, and hidden water streams where fairies play and magical plants bloom. Experience how sunlight filters through leaves, casting dancing shadows that guide fairy activity, and how each corner of the forest holds tiny secrets waiting to be discovered.
            </p>
            </article>

            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <h3 className="text-lg font-bold text-zinc-900">More Details</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
                Delve deeper into the types of magical plants that thrive in fairy realms, such as luminescent orchids, whispering ferns, and glowing bluebells. Learn about fairy traits like wings that sparkle in moonlight, magical dust that nurtures plant growth, and how they communicate with other creatures of the forest. This section also explores magical interactions, rituals, and seasonal cycles that keep the enchanted world in perfect balance.
            </p>
            </article>
        </div>
        </div>
      <div className="rounded-3xl border-2 bg-[#6B8754] border-zinc-900 p-5">
        <p className="text-[14px] font-semibold uppercase tracking-[0.28em] text-white"> 
          Visual Grid
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="h-60 w-full overflow-hidden rounded-[1.25rem]">
            <img src={beatopia} alt="beatopia" className="h-full w-full object-cover"/>
          </div>
          <div className="h-60 w-full overflow-hidden rounded-[1.25rem]">
            <img src={moodboard3} alt="moodboard3" className="h-full w-full object-cover"/>
          </div>
          <div className="h-60 w-full overflow-hidden rounded-[1.25rem]">
            <img src={fairyImage} alt="Fairy 2" className="h-full w-full object-cover"/>
          </div>
          <div className="h-60 w-full overflow-hidden rounded-[1.25rem]">
            <img src={moodboard2} alt="moodboard2" className="h-full w-full object-cover"/>
          </div>
        </div>
        <Button className="mt-8">View Section</Button>     
      </div>
     </div>
    </section>
  </div>
    );
   };

export default AboutPage;