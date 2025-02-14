// src/pages/planets/earth.tsx
import { Layout } from '@/components/shared/Layout';
import { SkillsSection } from '@/components/shared/SkillsSection';

export default function EarthPage() {
    const skills = [
        {
            category: "Frontend",
            items: ["React", "TypeScript", "Three.js", "Next.js"]
        },
        {
            category: "Backend",
            items: ["Node.js", "Python", "PostgreSQL", "MongoDB"]
        },
        {
            category: "DevOps",
            items: ["Docker", "AWS", "CI/CD", "Git"]
        }
    ];

    return (
        <Layout
            color="#4B9CD3"
            title="Technical Skills"
            description="My expertise and capabilities"
        >
            <div className="prose prose-invert max-w-none">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Skills Overview</h2>
                    <SkillsSection skills={skills} />
                </section>
            </div>
        </Layout>
    );
}