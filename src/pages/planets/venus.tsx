import { Layout } from '@/components/shared/Layout';
import ProjectCard from '@/components/shared/ProjectCard';
import Script from 'next/script';

export default function VenusPage() {
    const projects = [

        {
            title: "Mixtape card generator",
            description: "Users paste Spotify links and generate a shareable mixtape card.",
            imageUrl: "/projects/mixtape.png",
            link: "https://somemixtapes.com"
        },
        {
            title: "WebHooks Service",
            description: "Start delivering webhooks with confidence. No more lost events!",
            imageUrl: "/projects/whds.png",
            link: "https://webhook-delivery-b6bshhhtg4gyf5gm.canadacentral-01.azurewebsites.net"
        }
        ,
        {
            title: "Resume scanner and Analysis using AI",
            description: "Comprehensive extraction, parsing and analysis system that provides score as per ATS and job recommnedations as per the resume",
            imageUrl: "/projects/resumeAI.png",
            link: "https://toastmyresume.dev/"
        },
        {
            title: "Supply Chain Management System",
            description: "Comprehensive supply chain management system with secure authentication and efficient data pipelines",
            imageUrl: "/projects/capstone.png",
            link: "https://certifiedorigins.space"
        },

        {
            title: "Plant Care Mobile Application",
            description: "Comprehensive application to ensure plants get the care they deserve , built using flutter and firebase",
            imageUrl: "/projects/projects.png",
            link: "https://github.com/abhinavsingh1311/plant_mobile_app.git"
        },
        {
            title: "Projects",
            description: "I have added all of my projects in this github repository. Take a look at those by clicking the link!",
            imageUrl: "/projects/projects.png",
            link: "https://github.com/abhinavsingh1311/Projects.git"
        }

    ];

    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-5R3TT33HR4"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-5R3TT33HR4');
                `}
            </Script>
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
        </>
    );
}
