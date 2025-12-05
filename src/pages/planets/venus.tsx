import { Layout } from '@/components/shared/Layout';
import ProjectCard from '@/components/shared/ProjectCard';

export default function VenusPage() {
    const projects = [
        {
            title: "Projects",
            description: "I have added all of my projects in this github repository. Take a look at those by clicking the link!",
            imageUrl: "/projects/projects.png",
            link: "https://github.com/abhinavsingh1311/Projects.git"
        },
        {
            title: "Supply Chain Management System",
            description: "Comprehensive supply chain management system with secure authentication and efficient data pipelines",
            imageUrl: "/projects/capstone.png",
            link: "https://certifiedorigins.space"
        },
        {
            title: "Resume scanner and Analysis using AI",
            description: "Comprehensive extraction, parsing and analysis system that provides score as per ATS and job recommnedations as per the resume",
            imageUrl: "/projects/resumeAI.png",
            link: "https://projects-brown-alpha.vercel.app/"
        },
        {
            title: "Plant Care Mobile Application",
            description: "Comprehensive application to ensure plants get the care they deserve , built using flutter and firebase",
            imageUrl: "/projects/projects.png",
            link: "https://github.com/abhinavsingh1311/plant_mobile_app.git"
        }

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