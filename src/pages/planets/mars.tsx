import { Layout } from '@/components/shared/Layout';
import { ExperienceCard } from '@/components/shared/ExperienceCard';
import Image from 'next/image';
import Head from 'next/head';

export default function MarsPage() {
    const experiences = [
        {
            company: "Society For AI Literacy (SAIL)",
            role: "Full Stack Developer",
            period: "May 2024 - August 2024",
            description: [
                "Reduced data processing time by 40% through optimized PostgreSQL schema and efficient data pipelines",
                "Enhanced security by 85% implementing JWT tokenization and role-based access control",
                "Accelerated workflows by 35% with intuitive React interfaces for product management",
                "Delivered project 2 weeks ahead of schedule with an A+ grade"
            ],
            technologies: ["React", "PostgreSQL", "Supabase", "Digital Ocean", "JWT", "REST APIs"]
        },
        {
            company: "DMIT CSD Capstone Project",
            role: "Full Stack Developer",
            period: "September 2024 - December 2024",
            description: [
                "Built full-stack data collection system using JavaScript, TypeScript, and Python, improving data processing efficiency by 25%",
                "Integrated OpenAI API with structured prompt engineering, achieving 90%+ accuracy in automated medical data extraction",
                "Developed RESTful APIs using JSON Server backend, reducing manual processing time from 4 hours to 45 minutes per batch",
                "Redesigned React frontend with modern UI/UX principles, increasing user engagement by 40% based on analytics metrics",
                "Implemented Supabase database integration for real-time data synchronization and secure user authentication",
                "Collaborated with cross-functional team using Agile methodology, participating in daily standups and 2-week sprint cycles",
                "Wrote comprehensive technical documentation and conducted code reviews to maintain code quality standards",
                "Debugged and resolved 50+ production issues, improving system reliability and reducing downtime by 30%"
            ],
            technologies: ["Express.js", "PostgreSQL", "Supabase", "Next.js", "Python", "REST APIs", "OpenAI API"]
        }
    ];

    return (
        <>
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-5R3TT33HR4"></script>
                <script>
                    {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-5R3TT33HR4');`}
                </script>
            </Head>
            <Layout
                color="#E27B58"
                title="My Personal Journey"
                description="The path that shaped who I am today"
            >
                <div className="prose prose-invert max-w-none">
                    {/* Military Academy Years */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">The Foundation Years: AFPI Mohali</h2>

                        <div className="flex flex-col md:flex-row gap-2 mb-2">
                            <div className="w-full h-60 md:h-auto relative overflow-hidden rounded-lg">
                                <Image
                                    src="/images/afpi-mohali.jpg"
                                    alt="AFPI Mohali"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        backgroundColor: '#170c09'
                                    }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="md:w-2/3">
                                <p>
                                    My journey of personal growth began at the Army Forces Preparatory Institute (AFPI) in Mohali.
                                    Those formative years instilled in me the core values of truth, honor, and integrity that continue to shape
                                    my character and approach to life. The rigorous military-style education and training transformed me in
                                    profound ways — I became more disciplined, independent, and developed a thoughtful perspective on challenges.
                                </p>

                                <p>
                                    At AFPI, each day began before dawn with physical training followed by academic studies focused on
                                    preparation for the National Defence Academy (NDA). The structured environment taught me time management,
                                    resilience, and the value of hard work. Living by a code of conduct that emphasized being truthful and
                                    trustworthy under all circumstances shaped my approach to every task. I learned to choose the harder right
                                    over the easier wrong, a principle that guides my decision-making to this day.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* COVID Challenges */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Navigating Unexpected Challenges</h2>

                        <div className="flex flex-col-reverse md:flex-row gap-8 mb-8">
                            <div className="md:w-auto">
                                <p>
                                    In early 2020, like millions around the world, my carefully laid plans were disrupted by the COVID-19
                                    pandemic. What should have been the culminating phase of my NDA preparation transformed into a period
                                    of remote learning and adaptation. Despite the challenges, this period taught me invaluable lessons
                                    in flexibility and resilience.
                                </p>

                                <p>
                                    Although I graduated during this tumultuous time, the pandemic significantly impacted the NDA examination
                                    process. Despite my years of preparation and dedication, I faced setbacks in my pursuit of joining the
                                    National Defence Academy. This period of uncertainty forced me to reevaluate my path forward,
                                    ultimately leading me to consider new horizons and opportunities abroad.
                                </p>
                            </div>
                            {/* <div className="md:w-1/3 relative h-64 md:h-auto">
                            <Image
                                src="/images/covid-graduation.jpg"
                                alt="Graduation during COVID"
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div> */}
                        </div>
                    </section>

                    {/* Journey to Canada */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">New Beginnings in Canada</h2>

                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                            <div className="md:w-4/6">
                                <p>
                                    The decision to leave India was not an easy one, but it opened doors to unexpected opportunities.
                                    In 2022, I embarked on a journey to Canada, seeking to build a new future. Arriving in Edmonton was
                                    both exciting and intimidating — a new country, culture, and educational system awaited me. Though my path
                                    diverged from military service, I carried with me the courage to face new challenges without compromise or retreat.
                                </p>

                                <p>
                                    My early days in Canada were focused on adaptation and growth. I immersed myself in learning not just
                                    about software development at NAIT, but also about navigating life in a new country. The discipline and
                                    independence I had cultivated at AFPI served me well during this transition period. The tenacity to overcome
                                    hurdles and the wisdom to apply knowledge in practical ways became my guiding principles. I approached each
                                    challenge methodically, breaking down complex problems into manageable steps — whether learning a new
                                    programming language or understanding the Canadian work culture.
                                </p>
                            </div>
                            <div className="w-full h-60 md:h-auto relative overflow-hidden rounded-lg">
                                <Image
                                    src="/images/journey.gif"
                                    alt="Journey to Canada"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        backgroundColor: '#170c09'
                                    }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Skills Development */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Building Professional Skills</h2>

                        <div className="flex flex-col-reverse md:flex-row gap-8 mb-8">
                            <div className="md:w-auto">
                                <p>
                                    At NAIT, I discovered my passion for full-stack development. The structured curriculum combined with
                                    my self-directed learning allowed me to build a comprehensive skill set across multiple technologies.
                                    I applied the same discipline from my military preparation days to master programming languages,
                                    database systems, and web frameworks. The desire to excel in academic pursuits, instilled during my AFPI days,
                                    drove me to consistently push beyond basic requirements in my coursework.
                                </p>

                                <p>
                                    During my studies, I focused intensely on building practical skills through hands-on projects.
                                    The military precision I had developed earlier translated into clean, efficient code and
                                    well-structured applications. My commitment to honest dealing and clean thinking manifested in transparent,
                                    well-documented code and ethical approaches to problem-solving. My ability to work under pressure and meet
                                    strict deadlines—skills honed at AFPI—proved invaluable during intensive project phases and exam periods.
                                </p>
                            </div>
                            {/* <div className="md:w-1/3 relative h-64 md:h-auto">
                            <Image
                                src="/images/coding-skills.jpg"
                                alt="Developing coding skills"
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div> */}
                        </div>
                    </section>

                    {/* Professional Experience */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
                        <p className="mb-6">
                            My capstone project at NAIT represented the culmination of my educational journey in Canada and
                            the beginning of my professional career. It allowed me to apply both my technical skills and the
                            personal qualities I had developed throughout my life journey.
                        </p>

                        {experiences.map((experience, index) => (
                            <ExperienceCard key={index} {...experience} />
                        ))}
                    </section>

                    {/* Reflection */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Looking Back, Moving Forward</h2>
                        <p className="mb-4">
                            When I reflect on my journey from AFPI Mohali to becoming a software developer in Canada, I see how
                            each chapter has contributed to who I am today. The discipline, resilience, and methodical approach
                            I developed in my military preparation days continue to influence my approach to software development
                            and problem-solving. The values of being truthful, trustworthy, honest, and forthright under all circumstances
                            remain central to my professional ethic.
                        </p>
                        <p>
                            Though my path took unexpected turns, the foundation built at AFPI provided me
                            with the strength to adapt and thrive in new environments. The courage to know no compromise when
                            truth and righteousness are in peril guides my decisions in both technical work and personal interactions.
                            As I continue to grow professionally in the tech industry, I carry these values with me, approaching each
                            challenge with the same determination, structured thinking, and commitment to excellence that has guided
                            me thus far.
                        </p>
                    </section>
                </div>
            </Layout>

        </>
    );
}