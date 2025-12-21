import { Layout } from '@/components/shared/Layout';
import { FileText, Download } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';

export default function MercuryPage() {
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
                color="#A5A5A5"
                title="My Journey"
                description="The beginning of my tech adventure"
            >
                <div className="prose prose-invert max-w-none">
                    <section className="mb-12">
                        <div className="flex gap-4 mb-8">
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <FileText size={20} />
                                View Resume
                            </a>
                            <a
                                href="/resume.pdf"
                                download="AbhinavSingh_Resume.pdf"
                                className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <Download size={20} />
                                Download Resume
                            </a>
                        </div>

                        <div className="flex flex-col-reverse md:flex-row gap-6 mb-8">
                            <div className="md:w-2/3">
                                <p className="text-lg mb-6">
                                    My journey into the world of technology began with a fascination for how things work. From a young age,
                                    I was captivated by the possibilities of what could be created through code. This curiosity led me
                                    to explore programming as more than just a skill—it became my passion.
                                </p>

                                <p className="text-lg">
                                    After completing my high school education at Shemrock Senior Secondary School in India in 2021,
                                    I decided to pursue my dream of becoming a software developer. This led me to Edmonton, Alberta,
                                    where I enrolled in the Computer Software Development program at the Northern Alberta Institute of Technology (NAIT).
                                </p>
                            </div>
                            <div className="md:w-1/3 relative">
                                <div className="w-full h-60 md:h-80 relative overflow-hidden rounded-lg">
                                    <Image
                                        src="/images/early-days.jpg"
                                        alt="My early days in technology"
                                        fill
                                        style={{
                                            objectFit: 'contain',
                                            backgroundColor: '#111111'
                                        }}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>



                        </div>

                        <h2 className="text-2xl font-bold mb-6">Education</h2>
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="md:relative h-48 md:h-auto" style={{ width: '-webkit-fill-available' }}>
                                <Image
                                    src="/images/nait-logo.jpg"
                                    alt="NAIT logo"
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div className="md:w-3/4 bg-gray-900 rounded-lg p-6">
                                <a className="text-xl font-bold" href="https://www.nait.ca/programs/software-development" target='_blank' style={{ textDecoration: "underline" }}>DMIT: Computer Software Dev. Diploma</a>
                                <div className="text-gray-400 mb-2">Northern Alberta Institute of Technology (NAIT) | 2023-2024</div>
                                <ul className="list-disc list-inside text-gray-300">
                                    <li>Graduated with perfect 4.0 CGPA</li>
                                    <li>Earned a place on the Dean&apos;s Honor Roll</li>
                                    <li>Specialized in full-stack development with React, ASP.NET, and Three.js</li>
                                    <li>Led a capstone project that was delivered two weeks ahead of schedule</li>
                                </ul>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">My Path to Development</h2>

                        <div className="flex flex-col md:w-auto relative justify-center items-center">
                            <div className="h-60 md:h-80 relative overflow-hidden rounded-lg" style={{ width: "-webkit-fill-available" }}>
                                <Image
                                    src="/images/coding-journey.jpg"
                                    alt="My development journey"
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                        backgroundColor: '#111111',
                                        objectPosition: '50% 71%'
                                    }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="md:w-auto bg-gray-900/50 rounded-lg p-6 mt-4">
                                <p className="mb-4">
                                    At NAIT, I discovered my aptitude for both frontend and backend technologies. I became particularly
                                    interested in creating visually stunning interfaces while ensuring robust underlying systems.
                                </p>

                                <p className="mb-4">
                                    My dedication to excellence helped me master technologies like React, ASP.NET Core, and Three.js,
                                    along with database systems including PostgreSQL and MSSQL. I am especially proud of my work
                                    optimizing database schemas and implementing secure authentication systems.
                                </p>

                                <p>
                                    My capstone project was a defining moment in my educational journey. Working as a full-stack developer,
                                    I reduced data processing time by 40% through optimized database structures and built intuitive interfaces
                                    that accelerated workflows by 35%. These achievements, along with implementing robust security measures,
                                    allowed us to deliver the project two weeks ahead of schedule with an A+ grade.
                                </p>
                            </div>
                        </div>

                        <div className="md:w-auto relative mt-6">
                            <div className="w-full h-60 md:h-80 relative overflow-hidden rounded-lg">
                                <Image
                                    src="/images/portfolio-dev.gif"
                                    alt="Working on portfolio"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        backgroundColor: '#111111'
                                    }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        <p className="text-lg mb-6 mt-6">
                            Today, I continue to push the boundaries of what is possible with web technologies. My recent work at SAIL (Society for AI Literacy)
                            involved building an EHR data pipeline for cardiologists—an automated system using OpenAI&apos;s API that parses and standardizes medical records,
                            saving clinicians hundreds of hours of manual data entry each month. While this is just the beginning of my career,
                            it taught me what it takes to ship production-ready software and collaborate directly with real clients.
                        </p>

                        <p className="text-lg">
                            I am fluent in English, Punjabi (my native language), and Hindi, which helps me connect with diverse teams
                            and collaborate effectively. I am excited to continue growing as a developer and creating solutions that
                            make a difference.
                        </p>
                    </section>
                </div>
            </Layout>
        </>
    );
}