import {Layout} from "@/components/shared/Layout";

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

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">First Steps</h2>
                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4">Learning Path</h3>
                        <p className="mb-4">
                            My journey began with understanding the fundamentals of programming...
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Add your early learning experiences */}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}