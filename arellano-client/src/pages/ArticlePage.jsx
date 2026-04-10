import { useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import articles from "../assets/article-content.js";

function ArticlePage() {
    const { name } = useParams();
    const article = articles.find((article) => article.name === name);

    if (!article) {
        return (
            <div className="flex w-full flex-col gap-6 min-h-[60vh] px-6">
                <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                   <div className="mx-auto max-w-3xl">
                    <h1 className="text-3xl font-bold text-zinc-900">Article Not Found</h1>
                    <Button to="/articles" className="mt-6">Back to Articles</Button>
                    </div>
                </section>
            </div>
          );
        }

        return (
            <div className="flex bg-[#6B8754] w-full flex-col gap-6">
                <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                  <div className="mx-auto max-w-3xl">
                    <div className="mb-4">
                      <Button to="/articles">← Back to Articles</Button>
                      </div>
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Article
                      </p>
                      <h1 className="text-3xl font-bold leading-tighttext-zinc-900 sm:text-4xl">
                        {article.title}
                        </h1>
                        <p className="mt-2 text-md text-zinc-500">
                          {article.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </p>
                    </div>
                    </section>
      
                  {/* Article Image */}
                  {article.image && (
                    <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                      <div className="mx-auto max-w-3xl">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-auto rounded-2xl border-2 border-zinc-900 object-cover"
                        />
                      </div>
                    </section>
                  )}

                  {/* Article Content */}
                  <section className="border-y-2 border-zinc-600 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <div className="mx-auto max-w-2xl prose prose-sm max-w-none space-y-2 text-zinc-800">
                      {article.content.map((paragraph, index) => (
                        <p key={index} className="text-base text-center leading-4 whitespace-pre-wrap">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="mx-auto max-w-3xl mt-5 border-t-2 border-zinc-900 pt-6">
                    <Button to="/articles" variant="primary">← Back to Articles</Button>
                  </div>
                  </section>
                </div>
              );
            }

export default ArticlePage;

