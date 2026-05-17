import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList.jsx";
import { fetchArticles } from "../../services/ArticleService";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadArticles = async () => {
    try {
      setLoading(true);

      const { data } = await fetchArticles();

      // only show active articles
      const activeArticles = (data.articles || []).filter(
        (article) => article.isActive
      );

      setArticles(activeArticles);

    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div className="flex w-full bg-[#6B8754] flex-col gap-6">
      {/* HERO SECTION */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Magical Forest Tales
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Dive into stories about fairies, enchanted plants, and mystical gardens
          through these featured articles.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* ARTICLE SECTION */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article Card Grid
          </p>

          <h2 className="text-2xl font-bold text-zinc-900">
            ᭄᭡ A Fairy Stories Must Read ᭄
          </h2>
        </div>

        {loading ? (
          <p className="text-zinc-600">Loading articles...</p>
        ) : articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
            <div
              key={article._id || article.slug}
              className="rounded-xl border-2 border-zinc-900 bg-white p-4 shadow"
            >

              {/* FEATURED LABEL */}
              {article.featured && (
                <div className="mb-3">
                  <span className="rounded-full bg-pink-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-900">
                    ✨ Featured
                  </span>
                </div>
              )}

              {/* ARTICLE IMAGE */}
              <img
                src={
                  article.image?.trim() ||
                  "https://via.placeholder.com/600x350?text=No+Image"
                }
                alt={article.title}
                className="h-52 w-full rounded-xl border-2 border-zinc-900 object-cover"
              />

              <h3 className="mt-4 text-lg font-bold text-zinc-900">
                {article.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-600 line-clamp-3">
                {article.content}
              </p>

              <Button
                to={`/articles/${article.slug}`}
                className="mt-4"
              >
                Read More
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-600">No articles found.</p>
      )}
      </section>
    </div>
  );
};

export default ArticleListPage;