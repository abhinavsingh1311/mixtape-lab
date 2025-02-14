// src/pages/planets/mars.tsx
import { Layout } from '@/components/shared/Layout';
import { ExperienceCard } from '@/components/shared/ExperienceCard';

export default function MarsPage() {
    const experiences = [
        {
            company: "Tech Company",
            role: "Senior Software Engineer",
            period: "2022 - Present",
            description: [
                "Led development of scalable microservices",
                "Mentored junior developers",
                "Implemented CI/CD pipelines"
            ],
            technologies: ["React", "Node.js", "AWS"]
        }
        // Add more experiences
    ];

    return (
        <Layout
            color="#E27B58"
            title="Professional Experience"
            description="My career path and achievements"
        >
            <div className="prose prose-invert max-w-none">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={index} {...experience} />
                    ))}
                </section>
            </div>
        </Layout>
    );
}
