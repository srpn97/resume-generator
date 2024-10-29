// app/api/generate-resume/route.ts
import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
});

const RESUME_TEMPLATE = {
    personalInfo: {
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        github: '',
        linkedin: '',
    },
    summary: '',
    skills: {
        languages: [],
        frameworks: [],
        databases: [],
        cloudDevOps: [],
        tools: [],
        methodologies: [],
    },
    education: [
        {
            university: '',
            degree: '',
            location: '',
            dateRange: '',
            coursework: [],
        },
    ],
    experience: [
        {
            title: '',
            company: '',
            location: '',
            dateRange: '',
            achievements: [],
        },
    ],
    projects: [
        {
            name: '',
            dateRange: '',
            details: [],
        },
    ],
};

export async function POST(req: NextRequest) {
    try {
        const { jobDescription, resumeTemplate } = await req.json();

        if (!jobDescription) {
            return new Response('Job description is required', { status: 400 });
        }

        const systemPrompt = `You are an expert resume writer. Your task is to create or modify a resume to match the given job description.
    You must respond ONLY with a JSON object that matches exactly this structure:
    ${JSON.stringify(RESUME_TEMPLATE, null, 2)}

    Fill in all fields appropriately based on the job description and resume template provided.
    - Keep arrays of strings concise and relevant
    - Ensure all dates are in the format "MMM YYYY - MMM YYYY"
    - Make sure all achievements and details are specific and quantified where possible
    - Do not include any explanation or additional text, only the JSON object
    `;

        // Create a new TransformStream
        const stream = new TransformStream();
        const writer = stream.writable.getWriter();

        // Start the message stream
        const messageStream = await anthropic.messages.stream({
            messages: [
                {
                    role: 'user',
                    content: `Job Description: ${jobDescription}
          ${
              resumeTemplate
                  ? `Current Resume: ${resumeTemplate}`
                  : 'Create a new resume from scratch.'
          }
          
          Fill the JSON template with appropriate content that matches this job description.`,
                },
            ],
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4000,
            system: systemPrompt,
        });

        let fullResponse = '';

        messageStream
            .on('text', (text) => {
                fullResponse += text;
            })
            .on('error', async (error) => {
                console.error('Stream error:', error);
                try {
                    await writer.write(
                        new TextEncoder().encode(
                            JSON.stringify({ error: 'Error generating resume' })
                        )
                    );
                } finally {
                    await writer.close();
                }
            })
            .on('end', async () => {
                try {
                    // Try to parse the full response as JSON
                    const parsedJson = JSON.parse(fullResponse);
                    await writer.write(new TextEncoder().encode(JSON.stringify(parsedJson)));
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    await writer.write(
                        new TextEncoder().encode(
                            JSON.stringify({ error: 'Error parsing resume data' })
                        )
                    );
                } finally {
                    await writer.close();
                }
            });

        return new Response(stream.readable, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Error processing your request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
