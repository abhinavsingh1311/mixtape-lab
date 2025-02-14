import {Layout} from "@/components/shared/Layout";
import {ArticleCard} from "@/components/shared/ArticleCard";

export default function SaturnPage() {
    return (
        <Layout
            color="#E6B800"
            title="Blog & Thoughts"
            description="My insights and articles"
        >
            <div className="prose prose-invert max-w-none">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
                    {/*{articles.map((article, index) => (*/}
                    {/*    <ArticleCard key={index} article={article} />*/}
                    {/*))}*/}
                </section>
            </div>
        </Layout>
    );
}