import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import { getArticleBySlug } from "../../services/ArticleService";

function ArticlePage() {
const { slug } = useParams();
const [article, setArticle] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const load = async () => {
    try {
      setLoading(true);

      const { data } = await getArticleBySlug(slug);

      console.log("API response:", data);

      setArticle(data.article); // ✅ IMPORTANT
    } catch (err) {
      console.error(err);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  load();
}, [slug]);

  const articleImage =
    article?.image?.trim() ||
    "https://via.placeholder.com/1200x600?text=No+Image+Available";

  if (loading) {
    return (
      <div className="p-6 text-zinc-600">Loading article...</div>
    );
  }

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6 min-h-[60vh] px-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">
              Article Not Found
            </h1>
            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex bg-[#6B8754] w-full flex-col gap-6">

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <Button to="/articles">← Back to Articles</Button>

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article
          </p>

          <h1 className="text-3xl font-bold text-zinc-900">
            {article.title}
          </h1>

          <p className="mt-2 text-zinc-500">
            {article.slug}
          </p>
        </div>
      </section>

    <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <img
          src={articleImage}
          alt={article.title}
          className="w-full h-[220px] sm:h-[320px] md:h-[420px] rounded-2xl border-2 border-zinc-900 object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1200x600?text=No+Image+Available";
          }}
        />
      </div>
    </section>

      <section className="border-y-2 border-zinc-600 bg-zinc-50 px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-3 text-zinc-800">
          <p className="text-base whitespace-pre-wrap">
            {article.content}
          </p>
        </div>

        <div className="mx-auto max-w-3xl mt-5 border-t-2 border-zinc-900 pt-6">
          <Button to="/articles">← Back to Articles</Button>
        </div>
      </section>

    </div>
  );
}

export default ArticlePage;