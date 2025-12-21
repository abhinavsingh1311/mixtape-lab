// src/pages/planets/earth.tsx
import { Layout } from '@/components/shared/Layout';
import { SkillsSection } from '@/components/shared/SkillsSection';
import Script from 'next/script';

export default function EarthPage() {
    const skills = [
        {
            category: "Frontend",
            items: ["React", "Next.js", "Blazor", "Flutter", "Three.js", "HTML5", "CSS3"]
        },
        {
            category: "Backend",
            items: ["ASP.NET", "Node.js", "RESTful APIs", "Express.js"]
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
            items: ["Docker", "Git", "SSAS", "SSIS", "SSRS", "Github Actions"]
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
        </>
    );
}