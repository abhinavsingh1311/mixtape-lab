// src/pages/planets/saturn.tsx
import { Layout } from '@/components/shared/Layout';
import { ArticleCard } from '@/components/shared/ArticleCard';

export default function SaturnPage() {
    const articles = [
        {
            title: "Building a 3D Solar System Portfolio",
            excerpt: "Learn how I created this interactive portfolio using Three.js and React",
            date: "2024-02-14",
            readTime: "5",
            link: "#"
        }
        // Add more articles
    ];

    return (
        <Layout
            color="#E6B800"
            title="Blog & Thoughts"
            description="My insights and articles"
        >
            <div className="prose prose-invert max-w-none">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
                    {articles.map((article, index) => (
                        <ArticleCard key={index} {...article} />
                    ))}
                </section>
            </div>
        </Layout>
    );
}