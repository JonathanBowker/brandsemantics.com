import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    publishedAt: z.date(),
    author: z.string().default('Advanced Analytica'),
    tags: z.array(z.string()),
    series: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    publishedAt: z.date(),
    author: z.string().default('Advanced Analytica'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const resources = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false)
  })
});

const useCases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    industry: z.string().optional(),
    outcomes: z.array(z.string()).optional(),
    draft: z.boolean().default(false)
  })
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false)
  })
});

const brand = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  blog,
  caseStudies,
  resources,
  products,
  useCases,
  docs,
  brand
};
