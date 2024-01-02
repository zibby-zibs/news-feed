export default {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => [
        Rule.required().min(10).error('Title muust be at least 10 characters'),
        Rule.max(50).warning('Shorter titles are usually better'),
      ],
    },
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'author'}],
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
      validation: (Rule) => Rule.max(120).error('Excerpt must be less than 120 characters'),
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().error('You must have some content'),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required().error('You must have an image'),
    },
  ],
}
