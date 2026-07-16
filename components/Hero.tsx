import { Button } from "./ui/button";
import Link from 'next/link';
import metadata from '@/data/metadata.json' with { type: "json" };
import { AnimatedGreeting } from "./AnimatedGreeting";

export function Hero() {
    return (
        <section className='flex min-h-[7vh] flex-col items-center justify-center px-6 py-48 text-center'>
            <div className='max-w-3xl'>
                <h1 className='text-xl font-bold mb-4 sm:text-5xl antialiased'>
                    <AnimatedGreeting />! I&apos;m {metadata.profile.name}
                </h1>
                <p className='mt-6 text-lg leading-9 text-muted-foreground'>
                    {metadata.profile.description}
                </p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <Button variant='outline' asChild>
                        <Link href='/projects' className='text-sm font-semibold leading-6'>
                            View Projects
                        </Link>
                    </Button>
                    <Button variant='outline' asChild>
                        <Link href='' className='text-sm font-semibold leading-6'>
                            Get Resume
                        </Link>
                    </Button>
                    <Link href='/about' className='text-sm font-semibold leading-6'>
                        Learn More <span aria-hidden='true'>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}