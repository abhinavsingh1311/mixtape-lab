import { Layout } from '@/components/shared/Layout';

export default function MercuryPage() {
    return (
        <Layout
            color="#A5A5A5"
            title="My Journey"
            description="The beginning of my tech adventure"
        >
            <div className="prose prose-invert max-w-none">
                <p className="text-lg mb-8">
                    Starting my journey in technology, I discovered my passion for creating
                    innovative solutions through code.
                </p>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Early Milestones</h2>
                    <ul className="space-y-4">
                        <li>Self-taught programmer with a focus on web technologies</li>
                        <li>Graduated with honors in Computer Science</li>
                        <li>Active participant in coding communities and hackathons</li>
                    </ul>
                </section>
            </div>
        </Layout>
    );
}