// src/pages/planets/venus.tsx
import { Layout } from '@/components/shared/Layout';
import { ProjectCard } from '@/components/shared/ProjectCard';

export default function VenusPage() {
    const projects = [
        {
            title: "3D Solar System Portfolio",
            description: "Interactive portfolio built with Three.js and React",
            technologies: ["React", "Three.js", "TypeScript"],
            github: "https://github.com/yourusername/solar-portfolio"
        }
        // Add more projects
    ];

    return (
        <Layout
            color="#E6B800"
            title="My Work"
            description="Portfolio and projects"
        >
            <div className="prose prose-invert max-w-none">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </section>
            </div>
        </Layout>
    );
}