import { Layout } from '@/components/shared/Layout';
import ProjectCard from '@/components/shared/ProjectCard';

export default function VenusPage() {
    const projects = [
        {
            title: "Projects",
            description: "I have added all of my projects in this github repository. Take a look at those by clicking the link!",
            imageUrl: "/projects/portfolio.png",
            link: "https://github.com/abhinavsingh1311/Projects.git"
        },
        {
            title: "Supply Chain Management System",
            description: "Comprehensive supply chain management system with secure authentication and efficient data pipelines",
            imageUrl: "/projects/.png",
            link: "https://certifiedorigins.space"
        },

    ];

    return (
        <Layout
            color="#E6B800"
            title="My Work"
            description="Portfolio and projects"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </Layout>
    );
}