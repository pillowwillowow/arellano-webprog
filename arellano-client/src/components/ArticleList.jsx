import { Link } from "react-router-dom";
import Button from "./Button";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name} 
          className="flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
        >

          {article.image && (
            <div className="flex aspect-4/3 overflow-hidden rounded-[1.25rem]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col flex-1 mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article {String(index + 1).padStart(2, '0')}
            </p>

            <h3 className="mt-2 text-sm text-zinc-900">{article.title}</h3>

            <p className="mt-2 text-sm text-zinc-600 flex-1">
              {article.content[0].substring(0, 120)}...
            </p>

            <Link to={`/articles/${article.name}`}>
              <Button className="mt-4">Read More</Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;