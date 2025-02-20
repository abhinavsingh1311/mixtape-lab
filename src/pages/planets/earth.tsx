// src/pages/planets/earth.tsx
import { Layout } from '@/components/shared/Layout';
import { SkillsSection } from '@/components/shared/SkillsSection';

export default function EarthPage() {
    const skills = [
        {
            category: "Frontend",
            items: ["React", "Next.js", "Blazor", "Flutter", "Three.js", "HTML5", "CSS3"]
        },
        {
            category: "Backend",
            items: ["ASP.NET", "Node.js", "RESTful APIs", "FastAPI"]
        },
        {
            category: "Languages",
            items: ["C#", "JavaScript", "TypeScript", "Python", "Dart", "SQL"]
        },
        {
            category: "Databases & Cloud",
            items: ["MSSQL Server", "PostgreSQL", "Firebase", "Supabase", "Digital Ocean"]
        },
        {
            category: "Tools & Others",
            items: ["Docker", "Git", "SSAS", "SSIS", "SSRS", "Blender"]
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