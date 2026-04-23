import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import articles from "../../assets/article-content.js";

const ArticleListPage = () => {
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

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                       Article Card Grid 
                    </p>
                    <h2 className="text-2xl font-bold text-zinc-900">᭄᭡ Fairy-like Plants to Have  ᭄</h2>
                </div>
                <ArticleList articles={articles} />
            </section>
            </div>
            );
           }

           export default ArticleListPage;